import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';
import renderHTML from 'react-render-html';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import { getSingleCategory } from '../../helpers/categoryFetch';
import Layout from '../../components/Layout';
import Card from '../../components/Blog/Card';

const Category = ({ category, blogs, query, statusCode }) => {
  // const head = () => (
  //   <Head>
  //     <title>
  //       {category.name} | {APP_NAME}
  //     </title>
  //     <meta
  //       name="description"
  //       content={`Best programming tutorials on ${category.name}`}
  //     />
  //     <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
  //     <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
  //     <meta
  //       property="og:description"
  //       content={`Best programming tutorials on ${category.name}`}
  //     />
  //     <meta property="og:type" content="website" />
  //     <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
  //     <meta property="og:site_name" content={`${APP_NAME}`} />

  //     <meta
  //       property="og:image"
  //       content={`${DOMAIN}/static/images/seoblog.jpg`}
  //     />
  //     <meta
  //       property="og:image:secure_url"
  //       content={`${DOMAIN}/static/images/seoblog.jpg`}
  //     />
  //     <meta property="og:image:type" content="image/jpg" />
  //     <meta property="fb:app_id" content={`${FB_APP_ID}`} />
  //   </Head>
  // );

  if (statusCode === 404) {
    return (
      <div className="text-center">
        <h1>Oops</h1>
        <p>There is no category with that name</p>
      </div>
    );
  }
  return (
    <>
      {/* {head()} */}
      <Layout>
        <main>
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 text-center">
                  Category: {category.name}
                </h1>
                {blogs.map(b => (
                  <div key={b._id}>
                    <Card blog={b} />
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </>
  );
};

Category.getInitialProps = async ({ query }) => {
  const data = await getSingleCategory(query.slug);
  if (!data) {
    return { statusCode: 404 };
  } else {
    return { category: data.category, blogs: data.blogs, query };
  }
};

export default Category;
