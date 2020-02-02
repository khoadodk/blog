import { useState } from 'react';
import Link from 'next/link';
import { signup } from '../helpers/authFetch';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    success: false
  });

  const { name, email, password, confirmPassword, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setValues({ ...values, error: 'Password do not match' });
    } else {
      setValues({ ...values, error: false });
      signup({ name, email, password }).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            success: true
          });
        }
      });
    }
  };

  const registerForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange('password')}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Confirm Password</label>
        <input
          onChange={handleChange('confirmPassword')}
          type="password"
          className="form-control"
          value={confirmPassword}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary float-right">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link href="/signin">Sign In</Link>
    </div>
  );

  return (
    <div className="container">
      {showSuccess()}
      {showError()}
      {registerForm()}
    </div>
  );
};

export default Register;
