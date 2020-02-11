import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.API;

export const DOMAIN = publicRuntimeConfig.DOMAIN;

export const APP_NAME = process.env.APP_NAME;

export const FB_APP_ID = process.env.FB_APP_ID;

export const DISQUS_SHORTNAME = process.env.DISQUS_SHORTNAME;

export const SENDGRID_API = process.env.SENDGRID_API;
