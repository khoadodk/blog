import Layout from '../../../components/Layout';
import AdminRoute from '../../../components/AdminRoute';
import BlogCreate from '../../../components/BlogCreate';

const Blog = () => {
  return (
    <Layout>
      <AdminRoute>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-4 text-center">
              <h1>Create A Blog</h1>
            </div>
            <div className="col-md-12">
              <BlogCreate />
            </div>
          </div>
        </div>
      </AdminRoute>
    </Layout>
  );
};

export default Blog;
