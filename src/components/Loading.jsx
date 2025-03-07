import { Modal } from "react-bootstrap";

export default function Loading({ show }) {
  return (
    <Modal show={show} centered backdrop="static">
      <div
        className="d-flex flex-column justify-content-center  align-items-center"
        style={{
          height: "30rem",
        }}
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <br />
        <span>Loading</span>
      </div>
    </Modal>
  );
}
