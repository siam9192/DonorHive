import { EEnvironment, TEnvironment } from "../types";

const environment = import.meta.env.VITE_ENVIRONMENT as TEnvironment;
const envConfig = {
  serverBaseUrl:
    environment === EEnvironment.Development
      ? import.meta.env.VITE_SERVER_BASE_URL_DEV
      : import.meta.env.VITE_SERVER_BASE_URL_PROD,
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  },
  imgBB: {
    apiKey: import.meta.env.VITE_IMG_BB_API_KEY,
    uploadUrl: import.meta.env.IMG_BB_UPLOAD_URL,
  },
};

export default envConfig;
