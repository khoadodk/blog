// Work on both client and server side
import fetch from 'isomorphic-fetch';
import { removeCookie, removeLocalStorage } from './localStogage';
// import { API } from '../config';

export const signup = user => {
  return fetch(`${process.env.API}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const signin = user => {
  return fetch(`${process.env.API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const signout = next => {
  removeCookie('token');
  removeLocalStorage('user');
  next();
};
