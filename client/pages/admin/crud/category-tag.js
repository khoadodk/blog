import Layout from '../../../components/Layout';
import AdminRoute from '../../../components/AdminRoute';
import Category from '../../../components/Category';
import Tag from '../../../components/Tag';

const CategoryTag = () => {
  return (
    <Layout>
      <AdminRoute>
        <h1 className="title">Manage Categories and Tags</h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <Category />
            </div>
            <div className="col-md-6">
              <Tag />
            </div>
          </div>
        </div>
      </AdminRoute>
    </Layout>
  );
};

export default CategoryTag;
