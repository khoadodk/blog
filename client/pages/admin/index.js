import Layout from '../../components/Layout';
import AdminRoute from '../../components/AdminRoute';

const AdminPage = () => {
  return (
    <Layout>
      <AdminRoute>
        <h1 className="text-center pt-4 pb-4">Admin Dashboard</h1>
      </AdminRoute>
    </Layout>
  );
};

export default AdminPage;
