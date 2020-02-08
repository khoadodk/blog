import Layout from '../../components/Layout';
import AdminRoute from '../../components/AdminRoute';
import Link from 'next/link';
import { isAuth } from '../../helpers/localStogage';
// import { API } from '../../config';
import dynamic from 'next/dynamic';

const AdminPage = () => {
  // console.log(isAuth());
  const { username, name, email, role } = isAuth();
  const adminInfo = () => {
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
        <AdminRoute>
          <h1 className="title">Admin Dashboard</h1>
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
                    <a href="/admin/crud/blog">Create Blogs</a>
                  </li>
                  <li className="list-group-item">
                    <Link href="/admin/crud/blogs">
                      <a>Manage Blogs</a>
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/admin/crud/category-tag">
                      <a>Manage Categories & Tags</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">{adminInfo()}</div>
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
        </AdminRoute>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(AdminPage), {
  ssr: false
});
