import Layout from '../../../components/Layout';
import PrivateRoute from '../../../components/PrivateRoute';
import BlogCreate from '../../../components/BlogCreate';

const Blog = () => {
  return (
    <Layout>
      <PrivateRoute>
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
      </PrivateRoute>
    </Layout>
  );
};

export default Blog;
