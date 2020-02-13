import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { loginWithGoogle } from '../helpers/authFetch';
import { GOOGLE_CLIENT_ID } from '../config';
import { authenticate, isAuth } from '../helpers/localStogage';

const Google = () => {
  const responseGoogle = response => {
    loginWithGoogle({ idToken: response.tokenId }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push('/admin');
          } else {
            Router.push('/user');
          }
        });
      }
    });
  };
  return (
    <div>
      <GoogleLogin
        clientId={`${GOOGLE_CLIENT_ID}`}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};

export default Google;
