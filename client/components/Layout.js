import Header from './Header';
import Footer from './Footer';
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <div className="fixed-bottom">
        <Footer />
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
        .nav-link,
        .navbar-brand {
          color: white !important;
        }
        a:hover {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Layout;
