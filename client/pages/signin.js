import Layout from '../components/Layout';
import SigninComponent from '../components/SigninComponent';

const Signin = () => {
  return (
    <Layout>
      <h1 className="title">Sign In</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
