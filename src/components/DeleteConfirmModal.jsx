import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
function DeleteConfirmModal({
  show,
  handleClose,
  handleDeleteConfirm,
  blogTitle,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the blog titled "{blogTitle}"? This
        action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleDeleteConfirm();
            handleClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmModal;
