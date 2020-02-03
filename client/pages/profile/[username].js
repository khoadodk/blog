import { useState, useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { userPublicProfile } from '../../helpers/userFetch';
import Layout from '../../components/Layout';

const UserProfile = ({ user, blogs }) => {
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
                  <h5>{user.name}</h5>
                  <Link href="">
                    <a>View Profile</a>
                  </Link>
                  <div className="text-muted">
                    Join on: {moment(user.createdAt).format('MMM Do YYYY')}
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
  return { user: data.user, blogs: data.blogs, query };
};

export default UserProfile;
