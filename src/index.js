"use strict";

const Post = require("./post/post.model");
const express = require("express");
const app = express();
const port = 3000;
const postsService = require("./service/postsService");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const { check, validationResult } = require("express-validator/check");
const errorHandler = require("./common/error");

app.use(bodyParser.json());
app.use(expressValidator());

app.post(
  "/posts",
  [check("title").isLength({ min: 2 }), check("content").isLength({ min: 3 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    postsService
      .addPost(Post.fromRequestBody(req.body))
      .then(post => {
        res.status(201).json({
          message: "Post created",
          payload: post.toJSON()
        });
      })
      .catch(error => {
        errorHandler.errorHandler(error, req, res, next);
      });
  }
);

app.get("/posts", (req, res) => {
  postsService
    .getPosts()
    .then(posts => {
      res.status(201).json({
        payload: posts
      });
    })
    .catch(error => {
      errorHandler.errorHandler(error, req, res, next);
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
      errorHandler.errorHandler(error, req, res, next);
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
      errorHandler.errorHandler(error, req, res, next);
    });
});

app.use(function(req, res) {
  res.status(404);
  res.json({
    error: {
      code: "Page not found - error 404"
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
