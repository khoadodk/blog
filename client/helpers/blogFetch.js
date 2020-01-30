import { API } from '../config';
import fetch from 'isomorphic-fetch';

export const create = (blog, token) => {
  return fetch(`${API}/blog`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: blog
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
