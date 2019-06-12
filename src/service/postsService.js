"use strict";

let posts = [];

exports.addPost = post => {
  posts.push(post);
  return Promise.resolve(post);
};

exports.getPostById = postId => {
  let post = posts.find(post => post.id === postId);
  if (!post) {
    return Promise.reject("Error occurred");
  }
  return Promise.resolve(post);
};

exports.removePost = postId => {
  let postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex < 0) {
    return Promise.reject("Error occurred");
  }
  posts = posts.filter(post => post.id !== postId);
  return Promise.resolve();
};

exports.getPosts = () => {
  return Promise.resolve(posts);
};
