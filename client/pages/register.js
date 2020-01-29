import Layout from '../components/Layout';
import RegisterComponent from '../components/RegisterComponent';

const Register = () => {
  return (
    <Layout>
      <h1 className="title">Register</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <RegisterComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
