import Layout from '../../../components/Layout';
import AdminRoute from '../../../components/AdminRoute';
import BlogCreate from '../../../components/BlogCreate';

const Blog = () => {
  return (
    <Layout>
      <AdminRoute>
        <h1 className="title">Manage Blog</h1>
        <div className="container-fluid">
          <BlogCreate />
        </div>
      </AdminRoute>
    </Layout>
  );
};

export default Blog;
