import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import moment from 'moment';
import { getCookie, isAuth } from '../helpers/localStogage';
import { listAll, removeBlog } from '../helpers/blogFetch';

const BlogsRead = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const token = getCookie('token');

  const loadAllBlogs = () => {
    listAll(username).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoading(false);
        setBlogs(data);
      }
    });
  };
  useEffect(() => {
    loadAllBlogs();
  }, []);

  const deleteConfirm = slug => {
    let userToken = token;
    let answer = window.confirm('Are you sure you want to delete this blog?');
    if (answer) {
      removeBlog(slug, userToken).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setMessage(data.message);
          loadAllBlogs();
        }
      });
    }
  };

  const showUpdateButton = blog => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <a className="btn btn-md btn-warning ">Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="btn btn-md btn-warning ">Update</a>
        </Link>
      );
    }
  };

  const showAllBlogs = () =>
    blogs.map(blog => (
      <div className="pb-5 pt-3" key={blog._id}>
        <h3>{blog.title}</h3>
        <p className="mark">
          Written by {blog.postedBy.name} |{' '}
          {moment(blog.updatedAt).format('MMM Do YYYY')}
        </p>
        <p>{blog.excerpt.substring(0, 100)}...</p>
        <button
          className="btn btn-md btn-danger float-right"
          onClick={() => deleteConfirm(blog.slug)}
        >
          Delete
        </button>
        {showUpdateButton(blog)}
      </div>
    ));

  const showLoading = () =>
    blogs.length === 0 &&
    loading == true && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          {showLoading()}
          {message && (
            <div className="alert alert-success text-center">{message}</div>
          )}
          {showAllBlogs()}
        </div>
      </div>
    </div>
  );
};

export default BlogsRead;
