const baseUrl = import.meta.env.MODE === 'development' ?
  import.meta.env.VITE_BASE_URL_LOCAL
  :
  import.meta.env.VITE_BASE_URL_PRODUCTION;

export default baseUrl;