import { Modal } from "react-bootstrap";

export default function Loading({ show }) {
  return (
    <Modal
      show={show}
      centered
      backdrop="static"
      contentClassName="bg-transparent border-0"
      dialogClassName="border-0 shadow-none"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div
          className="spinner-border text-warning"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-white">Loading...</p>
      </div>
    </Modal>
  );
}
