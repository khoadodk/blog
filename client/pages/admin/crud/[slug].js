import Layout from '../../../components/Layout';
import AdminRoute from '../../../components/AdminRoute';
import BlogUpdate from '../../../components/BlogUpdate';

const Blog = () => {
  return (
    <Layout>
      <AdminRoute>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-4 text-center">
              <h1>Update Blog</h1>
            </div>
            <div className="col-md-12">
              <BlogUpdate />
            </div>
          </div>
        </div>
      </AdminRoute>
    </Layout>
  );
};

export default Blog;
