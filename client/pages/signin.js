import Layout from '../components/Layout';
import SigninComponent from '../components/SigninComponent';

const Signin = () => {
  return (
    <Layout>
      <h1 className="text-center pt-4 pb-4">Sign In</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
