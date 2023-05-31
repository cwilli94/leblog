const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get all comments for a specific post
router.get('/posts/:postId/comments', async (req, res) => {
  const postId = req.params.postId;
  try {
    const response = await axios.get(`http://localhost:3001/api/posts/${postId}/comments`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new comment for a specific post
router.post('/posts/:postId/comments', async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;
  try {
    const response = await axios.post(`http://localhost:3001/api/posts/${postId}/comments`, { content });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a comment by comment ID
router.put('/comments/:id', async (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;
  try {
    const response = await axios.put(`http://localhost:3001/api/comments/${commentId}`, { content });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a comment by comment ID
router.delete('/comments/:id', async (req, res) => {
  const commentId = req.params.id;
  try {
    const response = await axios.delete(`http://localhost:3001/api/comments/${commentId}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
