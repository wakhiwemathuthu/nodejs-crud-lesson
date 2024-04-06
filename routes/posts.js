const express = require("express");
const router = express.Router();
const validatePost = require("../middleware/validate-post");
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

router.route("/").post(validatePost, createPost).get(getAllPosts);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
