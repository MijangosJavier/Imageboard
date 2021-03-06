'use strict';

/**
 * Module dependencies
 */
var postsPolicy = require('../policies/posts.server.policy'),
  posts = require('../controllers/posts.server.controller');

module.exports = function (app) {
  // posts collection routes
  app.route('/api/posts').all(postsPolicy.isAllowed)
    // .get(posts.list)
    .post(posts.create);

  // Single post routes
  app.route('/api/posts/:postId').all(postsPolicy.isAllowed)
    .get(posts.read)
    .put(posts.update)
    .delete(posts.delete);

  app.route('/api/posts/list/:postId').all(postsPolicy.isAllowed)
    .get(posts.list);

  // Finish by binding the post middleware
  app.param('postId', posts.postByID);
};
