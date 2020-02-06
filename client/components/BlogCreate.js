import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../helpers/localStogage';
import { getCategories } from '../helpers/categoryFetch';
import { getTags } from '../helpers/tagsFetch';
import { create } from '../helpers/blogFetch';
import { QuillModules, QuillFormats } from '../helpers/quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../node_modules/react-quill/dist/quill.snow.css';

const BlogCreate = ({ router }) => {
  //Load the body from the localstorage
  const loadBlogBody = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };
  const [body, setBody] = useState(loadBlogBody());
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCat, setChechedCat] = useState([]);
  const [checkedTags, setChechedTags] = useState([]);
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePushlishButton: false
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePushlishButton
  } = values;

  const token = getCookie('token');

  //Load Categories
  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };
  //Load Tags
  const loadTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  //when the router changes, set a new Formdata
  useEffect(() => {
    loadCategories();
    loadTags();
    setValues({ ...values, formData: new FormData() });
  }, [router]);

  const handleBody = e => {
    //store the body into the state then store it in the localstorage
    //Because sometimes, window referesh so the body can be saved in the localstorage
    setBody(e);
    formData.set('body', e);
    localStorage.setItem('blog', JSON.stringify(e));
  };

  const handleChange = name => e => {
    //check if the name is photo
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const clickPublishBlog = e => {
    e.preventDefault();
    create(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `The blog with title of '${data.title}' is created`
        });
        setBody('');
        setCategories([]);
        setTags([]);
      }
    });
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={clickPublishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange('title')}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write your idea"
            onChange={handleBody}
          />
        </div>
        <button type="submit" className="btn btn-primary float-right">
          Publish
        </button>
      </form>
    );
  };

  const handleToggleCat = categoryId => () => {
    setValues({ ...values, error: '' });
    //return -1 if categoryId is not in the checked state
    const currentCategoryId = checkedCat.indexOf(categoryId);
    //if -1 means it in the state, push it to the state, else splice it out
    const newCheckedCategoryId = [...checkedCat];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(categoryId);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChechedCat(newCheckedCategoryId);
    formData.set('categories', newCheckedCategoryId);
  };

  const handleToggleTag = tagId => () => {
    setValues({ ...values, error: '' });
    //return -1 if categoryId is not in the checked state
    const currentTagId = checkedTags.indexOf(tagId);
    //if -1 means it in the state, push it to the state, else splice it out
    const newCheckedTagId = [...checkedTags];
    if (currentTagId === -1) {
      newCheckedTagId.push(tagId);
    } else {
      newCheckedTagId.splice(currentTagId, 1);
    }
    setChechedTags(newCheckedTagId);
    formData.set('tags', newCheckedTagId);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map(c => (
        <li className="list-unstyled" key={c._id}>
          <input
            type="checkbox"
            className="mr-2"
            onChange={handleToggleCat(c._id)}
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };
  const showTags = () => {
    return (
      tags &&
      tags.map(t => (
        <li className="list-unstyled" key={t._id}>
          <input
            type="checkbox"
            className="mr-2"
            onChange={handleToggleTag(t._id)}
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger text-center"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success text-center"
      style={{ display: success ? '' : 'none' }}
    >
      {success}
    </div>
  );

  return (
    <div className="container-fluid">
      {showError()}
      {showSuccess()}
      <div className="row">
        <div className="col-md-8">{createBlogForm()}</div>

        <div className="col-md-4">
          <div className="form-group pb-2">
            <h5>Featured Image</h5>
            <hr />
            <small className="text-muted">Max size 1 Mb</small>
            <label className="btn btn-outline-info">
              <input
                className="text-primary"
                onChange={handleChange('photo')}
                type="file"
                name="photo"
                accept="image/*"
              />
            </label>
          </div>

          <h5>Categories</h5>
          <hr />
          <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
            {showCategories()}
            {/* {JSON.stringify(checkedCat)} */}
          </ul>
          <h5>Tags</h5>
          <hr />
          <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
            {showTags()}
            {/* {JSON.stringify(checkedTags)} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogCreate);
