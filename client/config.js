import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.API_PRODUCTION
  : publicRuntimeConfig.API_DEVELOPMENT;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.DOMAIN_PRODUCTION
  : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const APP_NAME = process.env.APP_NAME;

export const FB_APP_ID = process.env.FB_APP_ID;

export const DISQUS_SHORTNAME = process.env.DISQUS_SHORTNAME;

export const SENDGRID_API = process.env.SENDGRID_API;
