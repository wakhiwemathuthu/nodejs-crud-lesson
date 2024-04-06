const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const postsDB = {
  posts: require("../model/posts.json"),
  setPosts: function (data) {
    return (this.posts = data);
  },
};

async function createPost(req, res, next) {
  const { title, message } = req.body;
  const user = req.user;
  const post = {
    title,
    message,
    id: uuid(),
    createdAt: format(new Date(), "yyyy-MM-dd HH:mm"),
    createdBy: user,
  };
  postsDB.setPosts([...postsDB.posts, post]);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "posts.json"),
      JSON.stringify(postsDB.posts)
    );
    res.json({ message: "post created 😎" });
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function getAllPosts(req, res) {
  return res.json(postsDB.posts);
}

function getPost(req, res) {
  const postId = req.params.id;
  const post = postsDB.posts.find((post) => post.id === postId);
  if (!post) {
    return res
      .status(404)
      .json({ message: `No post was found with id: ${postId}` });
  }
  res.json(post);
}

async function updatePost(req, res, next) {
  const user = req.user;
  const postId = req.params.id;
  const { title, message } = req.body;
  const foundPost = postsDB.posts.find((post) => post.id === postId);
  if (!foundPost) {
    return res
      .status(404)
      .json({ message: `No post was found with id: ${postId}` });
  }
  if (foundPost.createdBy !== user) {
    return res
      .status(406)
      .json({ message: "You cant edit posts that belong to other users" });
  }
  const otherPosts = postsDB.posts.filter((post) => post.id !== foundPost.id);
  if (title) {
    foundPost.title = title;
  }
  if (message) {
    foundPost.message = message;
  }
  postsDB.setPosts([...otherPosts, foundPost]);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "posts.json"),
      JSON.stringify(postsDB.posts)
    );
    res.json({ message: "Post updated successfully" });
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function deletePost(req, res, next) {
  const postId = req.params.id;
  const user = req.user;
  const foundPost = postsDB.posts.find((post) => post.id === postId);
  if (!foundPost) {
    return res
      .status(404)
      .json({ message: "The post you want to delete does not exist" });
  }
  if (foundPost.createdBy !== user) {
    return res
      .status(406)
      .json({ message: "You cant delete a post that belongs to other users" });
  }
  const otherPosts = postsDB.posts.filter((post) => post.id !== foundPost.id);
  postsDB.setPosts(otherPosts);
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "posts.json"),
      JSON.stringify(postsDB.posts)
    );
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost };
