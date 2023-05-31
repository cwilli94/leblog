const express = require('express');
const router = express.Router();
const axios = require('axios');

// Route to render all blog posts
router.get('/posts', async (req, res) => {
  try {
    const response = await axios.get('http://your-api-endpoint/posts');
    const posts = response.data;
    res.render('content', { posts });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog posts' });
  }
});

module.exports = router;
