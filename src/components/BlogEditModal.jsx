import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";
const APIURL = import.meta.env.VITE_APIURL || "https://vrv-backend-assignment-production.up.railway.app";
function BlogEditModal({ show, handleClose, selectedBlog, updateBlogList }) {
  const [title, setTitle] = useState(selectedBlog?.title || "");
  const [content, setContent] = useState(selectedBlog?.content || "");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${APIURL}/api/v1/blog/${selectedBlog._id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        updateBlogList(selectedBlog._id, { title, content });
        handleClose();
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Blog</Modal.Title>
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
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BlogEditModal;
