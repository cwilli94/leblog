const express = require('express');
const router = express.Router();

// Import the sub-routers
const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');

// Register the sub-routers
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);

module.exports = router;
