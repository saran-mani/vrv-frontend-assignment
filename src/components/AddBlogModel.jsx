import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const APIURL = import.meta.env.VITE_APIURL || "https://vrv-backend-assignment-production.up.railway.app";

function AddBlogModal({ show, handleClose, addNewBlog }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${APIURL}/api/v1/blog`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");
      if (response.status === 201) {
        addNewBlog(response.data.data);
        handleClose();
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBlogTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBlogContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter blog content"
              value={content}
              onChange={handleContentChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Blog
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddBlogModal;
