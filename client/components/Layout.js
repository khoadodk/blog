import Header from './Header';
import Footer from './Footer';
const Layout = ({ children }) => {
  return (
    <>
      <div className="sticky-top">
        <Header />
      </div>

      {children}
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Layout;
