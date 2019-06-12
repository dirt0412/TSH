const Post = require("./post/post.model");
const express = require("express");
const app = express();
//const port = 3000;
const postsService = require("./service/postsService");

app.post("/posts", (req, res) => {
  postsService
    .addPost(Post.fromRequestBody(req.body))
    .then(post => {
      res.status(201).json({
        message: "Post created",
        payload: post.toJSON()
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.get("/posts", (req, res) => {
  postsService
    .getPosts()
    .then(posts => {
      res.status(201).json({
        payload: posts
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.get("/posts/:postId", (req, res) => {
  postsService
    .getPostById(req.params.postId)
    .then(post => {
      res.status(200).json({
        payload: post.toJSON()
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.delete("/posts/:postId", (req, res) => {
  postsService
    .removePost(req.params.postId)
    .then(() => {
      res.status(204).json({
        message: "Post removed"
      });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
