export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-4">
      <div className="container">
        <div className="row justify-content-between align-items-start">
          <div className="col-md-4 text-center text-md-start mb-4 mb-md-0">
            <img
              src="../../assets/Logo.png"
              alt="Logo"
              className="mb-3"
              width="64"
              height="64"
            />
            <p className="small mb-0">
              © 2025 Tech Quiztify. All Rights Reserved
            </p>
          </div>

          <div className="col-md-8">
            <div className="row text-start text-secondary small">
              <div className="col-sm-4 mb-4">
                <h6 className="text-white fw-semibold mb-2">Quiz Category</h6>
                <ul className="list-unstyled">
                  <li>Web Development</li>
                </ul>
              </div>
              <div className="col-sm-4 mb-4">
                <h6 className="text-white fw-semibold mb-2">Company</h6>
                <ul className="list-unstyled">
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Help</li>
                  <li>Term Of Use</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
              <div className="col-sm-4 mb-4">
                <h6 className="text-white fw-semibold mb-2">Contacts</h6>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-center mb-2">
                    <i className="fas fa-envelope me-2"></i>
                    {/* <a
                      href="mailto:support@techquizify.com"
                      className="text-decoration-none text-secondary"
                    >
                      support@techquizify.com
                    </a> */}
                  </li>
                  <li className="d-flex align-items-center mb-2">
                    <i className="fas fa-phone-alt me-2"></i>
                    +62 111 111 111
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    Tangerang, Indonesia
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
