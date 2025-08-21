import axios from "axios";
import { LocalStorage } from "../lib";
import { baseUrl, storeKeys } from "@/shared/constants";
import router from "@/router";

const storage = LocalStorage.getInstance();

const reqInstance = axios.create({
  baseURL: baseUrl,
});

reqInstance.interceptors.response.use(
  res => res,
  async (err) => {

    const token = storage.getItem(storeKeys.authToken);

    if (err.response.status === 401 || !token) {
      storage.setItem(storeKeys.authToken);
      storage.setItem(storeKeys.userData);
      router.navigate({ to: '/login', replace: true });
    }
    throw err.response || err;
  }
);

reqInstance.interceptors.request.use(
  (req) => {
    const accessToken = storage.getItem(storeKeys.authToken) as undefined | string;
    if (accessToken)
      req.headers.authorization = `Bearer ${accessToken}`;

    return req;
  },
  (err) => {
    return err;
  }
);

export default reqInstance;