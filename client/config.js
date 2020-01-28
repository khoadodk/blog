import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? ''
  : 'http://localhost:5000';
export const APP_NAME = publicRuntimeConfig.APP_NAME;
