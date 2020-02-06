import Layout from '../../../components/Layout';
import PrivateRoute from '../../../components/PrivateRoute';
import BlogUpdate from '../../../components/BlogUpdate';

const Blog = () => {
  return (
    <Layout>
      <PrivateRoute>
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
      </PrivateRoute>
    </Layout>
  );
};

export default Blog;
