import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import { singleBlog, listRelated } from '../../helpers/blogFetch';
import Layout from '../../components/Layout';
import SmallCard from '../../components/Blog/SmallCard';

const SingleBlog = ({ blog, query, statusCode }) => {
  const [related, setRelated] = useState([]);

  if (statusCode === 404) {
    return (
      <div className="text-center">
        <h1>Oops</h1>
        <p>There is no blog with that name</p>
      </div>
    );
  }

  useEffect(() => {
    listRelated({ blog }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  }, []);

  // for SEO
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const { categories, tags } = blog;

  const showBlogCategories = categories =>
    categories.map(e => (
      <Link href={`/categories/${e.slug}`} key={e._id}>
        <a href="" className="btn btn-outline-info mr-1 ml-1 mt-2">
          {e.name}
        </a>
      </Link>
    ));

  const showBlogTags = tags =>
    tags.map(e => (
      <Link href={`/tags/${e.slug}`} key={e._id}>
        <a href="" className="btn btn-outline-primary mr-1 ml-1 mt-2">
          {e.name}
        </a>
      </Link>
    ));

  const showRelatedBlogs = () =>
    related.map(blog => (
      <div className="col-md-4" key={blog._id}>
        <article>
          <SmallCard blog={blog} />
        </article>
      </div>
    ));

  return (
    <>
      <Layout>
        {head()}
        <main>
          <article>
            <div className="container-fluid m-0 p-0">
              {/* photo */}
              <section className="text-center pt-2">
                <img
                  src={`${API}/blog/photo/${blog.slug}`}
                  alt={blog.title}
                  className="img img-fluid featured-image"
                  style={{ height: '25%', width: '25%' }}
                />
              </section>

              <section>
                <div className="container">
                  {/* title */}
                  <header>
                    <h2 className="display-5 pb-2 pt-3 text-center">
                      {blog.title}
                    </h2>{' '}
                  </header>
                  {/* Categories and Tags */}
                  {showBlogCategories(categories)}
                  {showBlogTags(tags)}

                  {/* Author and Date */}

                  <div className="lead pt-3 pb-1">
                    <p className="mark">
                      Written by &nbsp;
                      <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{blog.postedBy.name}</a>
                      </Link>
                      &nbsp;| &nbsp;
                      {moment(blog.updatedAt).format('MMM Do YYYY')}
                    </p>
                  </div>
                </div>
              </section>
              {/* Body */}
              <div className="container">
                <section>
                  <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
                </section>
              </div>

              {/* Realated Blogs */}
              <div className="container pb-5 pt-3">
                <h4 className="text-center h2">Related Blogs</h4>
                <div className="row">{showRelatedBlogs()}</div>
              </div>
            </div>
          </article>
        </main>
      </Layout>
    </>
  );
};

SingleBlog.getInitialProps = async ({ query }) => {
  //query refering to router

  const data = await singleBlog(query.slug);
  if (!data) {
    return {
      statusCode: 404
    };
  } else {
    return { blog: data, query };
  }
};

export default SingleBlog;
