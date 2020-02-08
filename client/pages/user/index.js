import Link from 'next/link';
import Layout from '../../components/Layout';
import PrivateRoute from '../../components/PrivateRoute';
import { isAuth } from '../../helpers/localStogage';
// import { API } from '../../config';
import dynamic from 'next/dynamic';

const UserPage = () => {
  const { name, email, role, username } = isAuth();
  // console.log(isAuth());
  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Profile</h3>
        <ul className="list-group">
          <li className="list-group-item">Name:&nbsp;{name}</li>
          <li className="list-group-item">Email:&nbsp;{email}</li>
          <li className="list-group-item">
            Role:&nbsp;{role === 1 ? 'Admin' : 'Registered User'}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <Layout>
        <PrivateRoute>
          <h1 className="title">User Dashboard</h1>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link href="/user/update">
                      <a>Update Profile</a>
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/user/crud/blogs">
                      <a>Manage Your Blogs</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">{userInfo()}</div>
              <div className="col-md-4">
                <img
                  src={`${process.env.API}/user/photo/${username}`}
                  className="img img-fluid img-thumbnail mb-3"
                  style={{ maxHeight: 'auto', maxWidth: '100%' }}
                  alt="profile photo"
                />
              </div>
            </div>
          </div>
        </PrivateRoute>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(UserPage), {
  ssr: false
});
