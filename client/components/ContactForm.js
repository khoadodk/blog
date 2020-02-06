import { useState } from 'react';
import { emailContactForm } from '../helpers/contactFetch';

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    message: '',
    name: '',
    email: '',
    success: false,
    error: false
  });

  const { message, name, email, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    let dataToServer;
    if (authorEmail) {
      dataToServer = { authorEmail, name, email, message };
    } else {
      dataToServer = { name, email, message };
    }
    emailContactForm(dataToServer).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          message: '',
          name: '',
          email: '',
          success: 'Message sent successfully',
          error: false
        });
      }
    });
  };

  const contactForm = () => {
    return (
      <form onSubmit={handleSubmit} className="pb-5">
        <div className="form-group">
          <div className="form-group">
            <label className="lead">Your Name</label>
            <input
              type="text"
              onChange={handleChange('name')}
              className="form-control"
              value={name}
              required
            />
          </div>

          <div className="form-group">
            <label className="lead">Your Email</label>
            <input
              type="email"
              onChange={handleChange('email')}
              className="form-control"
              value={email}
              required
            />
          </div>

          <label className="lead">Your Message</label>
          <textarea
            onChange={handleChange('message')}
            type="text"
            className="form-control"
            value={message}
            required
            rows="10"
          ></textarea>
        </div>

        <div>
          <button className="btn btn-primary float-right">Submit</button>
        </div>
      </form>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger text-center"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success text-center"
      style={{ display: success ? '' : 'none' }}
    >
      {success}
    </div>
  );

  return (
    <div>
      {showError()}
      {showSuccess()}
      {contactForm()}
    </div>
  );
};

export default ContactForm;
