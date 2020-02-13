const Footer = () => {
  return (
    <footer className="bg-dark p-3">
      <div className="container-fluid text-white">
        <div className="row">
          <div className="col-6">
            <p className="mb-0">
              <small>
                Copyright &copy; 2020 All Rights Reserved by Khoa Do
              </small>
            </p>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <a className="mr-3">
              <i className="fab fa-facebook"></i>
            </a>
            <a className="mr-3">
              <i className="fab fa-linkedin"></i>
            </a>
            <a className="mr-3">
              <i className="fab fa-dribbble"></i>
            </a>
            <a className="mr-3">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
