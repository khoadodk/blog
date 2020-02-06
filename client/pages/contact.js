import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="title">Contact</h1>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
