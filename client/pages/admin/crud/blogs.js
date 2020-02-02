import Layout from '../../../components/Layout';
import AdminRoute from '../../../components/AdminRoute';
import BlogsRead from '../../../components/BlogsRead';

const Blog = () => {
  return (
    <Layout>
      <AdminRoute>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-4 text-center">
              <h1>Manage Blogs</h1>
            </div>
            <div className="col-md-12">
              <BlogsRead />
            </div>
          </div>
        </div>
      </AdminRoute>
    </Layout>
  );
};

export default Blog;
