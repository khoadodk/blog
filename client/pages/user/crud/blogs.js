import Layout from '../../../components/Layout';
import PrivateRoute from '../../../components/PrivateRoute';
import BlogsRead from '../../../components/BlogsRead';
import { isAuth } from '../../../helpers/localStogage';

const Blog = () => {
  const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <PrivateRoute>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-4 text-center">
              <h1>Manage Blogs</h1>
            </div>
            <div className="col-md-12">
              <BlogsRead username={username} />
            </div>
          </div>
        </div>
      </PrivateRoute>
    </Layout>
  );
};

export default Blog;
