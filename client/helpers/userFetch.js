// import { API } from '../config';
import fetch from 'isomorphic-fetch';

export const userPublicProfile = username => {
  return fetch(`${process.env.API}/user/${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProfile = token => {
  return fetch(`${process.env.API}/user/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateProfile = (token, updatedUser) => {
  return fetch(`${process.env.API}/user/update`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: updatedUser
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
