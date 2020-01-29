// Work on both client and server side
import { API } from '../config';
import fetch from 'isomorphic-fetch';
import { removeCookie, removeLocalStorage } from './localStogage';

export const signup = user => {
  return fetch(`${API}/register`, {
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
  return fetch(`${API}/signin`, {
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
