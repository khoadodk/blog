import Layout from '../../components/Layout';
import AdminRoute from '../../components/AdminRoute';
import Link from 'next/link';

const AdminPage = () => {
  return (
    <Layout>
      <AdminRoute>
        <h1 className="title">Admin Dashboard</h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/blog">
                    <a>Create Blogs</a>
                  </Link>
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
            <div className="col-md-8">right</div>
          </div>
        </div>
      </AdminRoute>
    </Layout>
  );
};

export default AdminPage;
