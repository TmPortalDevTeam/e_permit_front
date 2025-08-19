import axios, { type AxiosRequestConfig } from "axios";
import { LocalStorage } from "../lib";
import { baseUrl, storeKeys } from "@/shared/constants";
import router from "@/router";

const storage = LocalStorage.getInstance();

const instance = axios.create({
  baseURL: '',
});

let isRefreshing = false;
const refreshAndRetryQueue: {
  config: AxiosRequestConfig;
  resolve: Function;
  reject: Function;
}[] = [];

instance.interceptors.response.use(
  res => res,
  async (err) => {

    const token = storage.getItem(storeKeys.authToken);
    const accessToken = token.accessToken;
    const refreshToken = token.refreshToken;

    if (err.response.status === 401 || !accessToken) {
      const config = err.config;
      if (!isRefreshing) {
        // Attempt to refresh the access token
        try {
          isRefreshing = true;
          const headers = {
            Authorization: `Bearer ${refreshToken}`,
          };
          const RES = await axios.get(baseUrl + "/auth/refresh-token", { headers: headers });
          if (RES.data.success) {
            const { accessToken, refreshToken } = RES.data.data;
            // If token refresh is successful, retry all requests in the queue with the new token

            isRefreshing = false;
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              if (config.headers?.Authorization) config.headers.Authorization = `Bearer ${accessToken}`;
              instance.request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });

            router.navigate({ to: '/', replace: true });
          } else {
            // Token refresh also failed, clear authentication data and reload the page

            storage.setItem(storeKeys.authToken);
            router.navigate({ to: '/login', replace: true });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status == 403) {
              storage.setItem(storeKeys.authToken);
              router.navigate({ to: '/login', replace: true });
            }
          }
        }
      }
      else {
        new Promise<void>((resolve, reject) => {
          refreshAndRetryQueue.push({
            config: config,
            resolve,
            reject,
          });
        });
      }
    }
    return err;
  }
);

instance.interceptors.request.use(
  (req) => {
    const token = storage.getItem(storeKeys.authToken);
    const accessToken = token.accessToken;
    const refreshToken = token.refreshToken;
    if (!refreshToken) {
      storage.setItem(storeKeys.authToken);
      router.navigate({ to: '/login', replace: true });
    }
    req.headers.authorization = `Bearer ${accessToken ?? refreshToken}`;
    req.headers["page"] = window.location.pathname;
    return req;
  },
  (err) => {
    return err;
  }
);