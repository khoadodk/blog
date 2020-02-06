import Link from 'next/link';
import Layout from '../../components/Layout';
import PrivateRoute from '../../components/PrivateRoute';

const UserPage = () => {
  return (
    <Layout>
      <PrivateRoute>
        <h1 className="title">User Dashboard</h1>
        <div className="container-fluid">
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
            <div className="col-md-8">right</div>
          </div>
        </div>
      </PrivateRoute>
    </Layout>
  );
};

export default UserPage;
