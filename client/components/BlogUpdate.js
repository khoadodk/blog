import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../helpers/localStogage';
import { getCategories } from '../helpers/categoryFetch';
import { getTags } from '../helpers/tagsFetch';
import { singleBlog, updateBlog } from '../helpers/blogFetch';
import { QuillModules, QuillFormats } from '../helpers/quill';
import { API } from '../config';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../node_modules/react-quill/dist/quill.snow.css';

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState('');

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags

  const [values, setValues] = useState({
    title: '',
    error: '',
    success: '',
    formData: '',
    title: '',
    body: ''
  });

  const { error, success, formData, title } = values;
  const token = getCookie('token');

  useEffect(() => {
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  //Get the blog from API and set it to the state
  const initBlog = () => {
    //if there is a router, run the fetch
    if (router.query.slug) {
      singleBlog(router.query.slug).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title, formData: new FormData() });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = blogCategories => {
    let ca = [];
    blogCategories.map((c, i) => {
      ca.push(c._id);
    });
    setChecked(ca);
  };

  const setTagsArray = blogTags => {
    let ta = [];
    blogTags.map((t, i) => {
      ta.push(t._id);
    });
    setCheckedTag(ta);
  };

  //Get all the Categories from API and set it to the state
  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };
  //Get all the Tags from API and set it to the state
  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const handleToggle = categoryId => () => {
    setValues({ ...values, error: '' });
    //return -1 if categoryId is not in the checked state
    const currentCategoryId = checked.indexOf(categoryId);
    //if -1 means it in the state, push it to the state, else splice it out
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(categoryId);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    formData.set('categories', newCheckedCategoryId);
  };

  const handleTagsToggle = tagId => () => {
    setValues({ ...values, error: '' });
    //return -1 if categoryId is not in the checked state
    const currentTagId = checkedTag.indexOf(tagId);
    //if -1 means it in the state, push it to the state, else splice it out
    const newCheckedTagId = [...checkedTag];
    if (currentTagId === -1) {
      newCheckedTagId.push(tagId);
    } else {
      newCheckedTagId.splice(currentTagId, 1);
    }
    setCheckedTag(newCheckedTagId);
    formData.set('tags', newCheckedTagId);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggle(c._id)}
            checked={checked.indexOf(c._id) !== -1}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleTagsToggle(t._id)}
            checked={checkedTag.indexOf(t._id) !== -1}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const handleChange = name => e => {
    // console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = e => {
    setBody(e);
    formData.set('body', e);
  };

  const editBlog = e => {
    e.preventDefault();
    updateBlog(formData, token, router.query.slug).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          success: `Blog titled "${data.title}" is successfully updated`
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? '' : 'none' }}
    >
      {success}
    </div>
  );

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange('title')}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary float-right">
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      {showSuccess()}
      {showError()}
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}

          {body && (
            <img
              src={`${API}/blog/photo/${router.query.slug}`}
              alt={title}
              style={{ width: '100%', paddingTop: '10px' }}
            />
          )}
        </div>

        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />

              <small className="text-muted">Max size: 1mb</small>
              <br />
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  onChange={handleChange('photo')}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />

            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogUpdate);
