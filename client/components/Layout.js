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
    </>
  );
};

export default Layout;
