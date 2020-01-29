import Layout from '../../components/Layout';
import PrivateRoute from '../../components/PrivateRoute';

const UserPage = () => {
  return (
    <Layout>
      <PrivateRoute>
        <h1 className="text-center pt-4 pb-4">User Dashboard</h1>
      </PrivateRoute>
    </Layout>
  );
};

export default UserPage;
