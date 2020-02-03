import Layout from '../../components/Layout';
import PrivateRoute from '../../components/PrivateRoute';
import ProfileUpdate from '../../components/ProfileUpdate';

const UserProfileUpdate = () => {
  return (
    <Layout>
      <PrivateRoute>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-4 text-center">
              <h1>Update Profile</h1>
            </div>
            <div className="col-md-12">
              <ProfileUpdate />
            </div>
          </div>
        </div>
      </PrivateRoute>
    </Layout>
  );
};

export default UserProfileUpdate;
