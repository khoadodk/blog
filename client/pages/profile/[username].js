import { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { userPublicProfile } from '../../helpers/userFetch';
import Layout from '../../components/Layout';
import { API } from '../../config';

const UserProfile = ({ user, blogs, statusCode }) => {
  if (statusCode === 404) {
    return (
      <div className="text-center">
        <h1>Oops</h1>
        <p>There is no user with that name</p>
      </div>
    );
  }

  const showUserBlogs = () => (
    <div>
      {blogs.map(blog => (
        <div key={blog._id} className="p-1">
          <Link href={`/blogs/${blog.slug}`}>
            <a>{blog.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Layout>
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h5>{user.name}</h5>
                      <p className="text-muted">
                        Join on: {moment(user.createdAt).format('MMM Do YYYY')}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <img
                        src={`${API}/user/photo/${user.username}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{ maxHeight: '100px', maxWidth: '100%' }}
                        alt="user profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div className="container pb-5">
          <div className="row">
            <div className="col-md-6">
              <div className="card-title bg-light p-4 lead">Recent post</div>

              {showUserBlogs()}
            </div>
            <div className="col-md-6">
              <div className="card-title bg-light p-4 lead">
                Message to {user.name}
              </div>

              <p>contact</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

UserProfile.getInitialProps = async ({ query }) => {
  const data = await userPublicProfile(query.username);
  if (!data) {
    return { statusCode: 404 };
  } else {
    return { user: data.user, blogs: data.blogs, query };
  }
};

export default UserProfile;
