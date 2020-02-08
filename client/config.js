// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();
console.log(process.env.NODE_ENV);
export let API;
if (process.env.NODE_ENV === 'development') {
  API = process.env.API_DEVELOPMENT;
} else {
  API = process.env.API_PRODUCTION;
}

export let DOMAIN;
if (process.env.NODE_ENV === 'development') {
  DOMAIN = process.env.DOMAIN_DEVELOPMENT;
} else {
  DOMAIN = process.env.DOMAIN_PRODUCTION;
}

export const APP_NAME = process.env.APP_NAME;

export const FB_APP_ID = process.env.FB_APP_ID;

export const DISQUS_SHORTNAME = process.env.DISQUS_SHORTNAME;

export const SENDGRID_API = process.env.SENDGRID_API;
