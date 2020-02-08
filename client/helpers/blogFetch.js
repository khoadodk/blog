// import { API } from '../config';
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import { isAuth } from './localStogage';

console.log('process.env.API', process.env.API);

export const create = (blog, token) => {
  let createBlogEndpoint;
  if (isAuth() && isAuth().role === 1) {
    createBlogEndpoint = `${process.env.API}/blog`;
  } else if (isAuth() && isAuth().role === 0) {
    createBlogEndpoint = `${process.env.API}/user/blog`;
  }

  return fetch(`${createBlogEndpoint}`, {
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

export const listBlogWithCatAndTags = (skip, limit) => {
  let data = { skip, limit };
  return fetch(`${process.env.API}/blogs-categories-tags`, {
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
    .catch(err => {
      console.log(err);
    });
};

export const singleBlog = slug => {
  return fetch(`${process.env.API}/blog/${slug}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const listRelated = blog => {
  return fetch(`${process.env.API}/blogs/related`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(blog)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const listAll = username => {
  //Check if blogs are posted by the user to allow update/delete
  let listBlogEndpoint;
  if (username) {
    listBlogEndpoint = `${process.env.API}/${username}/blogs`;
  } else {
    listBlogEndpoint = `${process.env.API}/blogs`;
  }
  return fetch(`${listBlogEndpoint}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateBlog = (updatedBlog, token, slug) => {
  let updateBlogEndpoint;
  if (isAuth() && isAuth().role === 1) {
    updateBlogEndpoint = `${process.env.API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    updateBlogEndpoint = `${process.env.API}/user/blog/${slug}`;
  }

  return fetch(`${updateBlogEndpoint}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: updatedBlog
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const removeBlog = (slug, token) => {
  return fetch(`${process.env.API}/blog/${slug}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

export const listSearch = params => {
  console.log('params', params);
  let query = queryString.stringify(params); // {title:react, body: love} => 'title=react&body=love'
  console.log('query', query);
  return fetch(`${process.env.API}/blogs/search?${query}`, {
    method: 'GET'
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
