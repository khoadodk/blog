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

export const listBlogWithCatAndTags = (skip, limit) => {
  let data = { skip, limit };
  return fetch(`${API}/blogs-categories-tags`, {
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
  return fetch(`${API}/blog/${slug}`, {
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
  return fetch(`${API}/blogs/related`, {
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

export const listAll = () => {
  return fetch(`${API}/blogs`, {
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
  return fetch(`${API}/blog/${slug}`, {
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
  return fetch(`${API}/blog/${slug}`, {
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
