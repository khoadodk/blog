import fetch from 'isomorphic-fetch';
// import { API } from '../config';

export const emailContactForm = data => {
  let emailEndpoint;
  //Author Endpoint
  if (data.authorEmail) {
    emailEndpoint = `${process.env.API}/contact-blog-author`;
  } else {
    //Admin endpoint
    emailEndpoint = `${process.env.API}/contact`;
  }
  // console.log(data);

  return fetch(`${emailEndpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
