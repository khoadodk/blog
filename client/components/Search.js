import { useState, useEffect } from 'react';
import Link from 'next/link';

import { listSearch } from '../helpers/blogFetch';

const Search = () => {
  const [values, setValues] = useState({
    search: '',
    results: [],
    searched: false,
    message: ''
  });

  const { search, results, searched, message } = values;

  const handleChange = e => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: []
    });
  };

  const searchSubmit = e => {
    e.preventDefault();

    listSearch({ search }).then(data => {
      //   console.log(data);
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} blogs found with ${search}!`
      });
    });
  };

  const handleClose = () => {
    setValues({ ...values, search: '', results: [], searched: false });
  };

  const searchedBlogs = (results = []) => (
    <div className="jumbotron bg-light text-center">
      {message && <p className="pt-4 text-muted font-italic">{message}</p>}
      {results.map(blog => (
        <div key={blog._id} className="mt-2">
          <Link href={`/blogs/${blog.slug}`}>
            <a className="text-primary">{blog.title}</a>
          </Link>
        </div>
      ))}
      <button className="btn btn-danger float-right" onClick={handleClose}>
        Close
      </button>
    </div>
  );

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend"></div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange}
            placeholder="Search Blogs"
          />
        </div>
        <div className="btn input-group-append" style={{ border: 'none' }}>
          <button className="btn btn-primary">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div>
      <div>{searchForm()}</div>
      {searched && <div className="mt-10">{searchedBlogs(results)}</div>}
    </div>
  );
};

export default Search;
