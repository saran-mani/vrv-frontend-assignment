import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Blogs.css";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import BlogEditModal from "../components/BlogEditModal";
import Logout from "../components/Logout";
import AddBlogModal from "../components/AddBlogModel";
const APIURL = import.meta.env.VITE_APIURL || "https://vrv-backend-assignment-production.up.railway.app";
function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);

  const fetchBlogs = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${APIURL}/api/v1/blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.data) {
        setBlogs(response.data.data);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setShowConfirmDeleteModal(true);
  };

  const addNewBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  };

  const handleAddBlogClick = () => {
    setShowAddBlogModal(true);
  };

  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${APIURL}/api/v1/blog/${selectedBlog._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== selectedBlog._id)
        );
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const updateBlogList = (id, updatedBlog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === id ? { ...blog, ...updatedBlog } : blog
      )
    );
  };

  const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      return decodedToken.role;
    }
    return null;
  };

  const userRole = getUserRole();

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="logout">
        <Logout />
      </div>
      {userRole === "admin" ? (
        <Button
          variant="primary"
          className="logout"
          onClick={handleAddBlogClick}
        >
          Add Blog
        </Button>
      ) : null}
      <h1 style={{ padding: "10px" }}>Blogs</h1>
      <div className="blog-container">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-post">
              <h1 className="blog-title">{blog.title}</h1>
              <p className="blog-content">{blog.content}</p>
              {userRole === "admin" || userRole === "moderator" ? (
                <Button
                  variant="primary"
                  onClick={() => handleEditClick(blog)}
                  className="edit-btn"
                >
                  Edit
                </Button>
              ) : null}
              {userRole === "admin" ? (
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(blog)}
                  className="delete-btn"
                >
                  Delete
                </Button>
              ) : null}
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>

      {selectedBlog && (
        <BlogEditModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          selectedBlog={selectedBlog}
          updateBlogList={updateBlogList}
        />
      )}

      {selectedBlog && (
        <DeleteConfirmModal
          show={showConfirmDeleteModal}
          handleClose={() => setShowConfirmDeleteModal(false)}
          handleDeleteConfirm={handleDeleteConfirm}
          blogTitle={selectedBlog.title}
        />
      )}
      <AddBlogModal
        show={showAddBlogModal}
        handleClose={() => setShowAddBlogModal(false)}
        addNewBlog={addNewBlog}
      />
    </>
  );
}

export default Blogs;
