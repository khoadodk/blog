// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();

export const API =
  process.env.NODE_ENV === 'development'
    ? process.env.API_DEVELOPMENT
    : process.env.API_PRODUCTION;

export const DOMAIN =
  process.env.NODE_ENV === 'development'
    ? process.env.DOMAIN_DEVELOPMENT
    : process.env.DOMAIN_PRODUCTION;

export const APP_NAME = process.env.APP_NAME;

export const FB_APP_ID = process.env.FB_APP_ID;

export const DISQUS_SHORTNAME = process.env.DISQUS_SHORTNAME;

export const SENDGRID_API = process.env.SENDGRID_API;
