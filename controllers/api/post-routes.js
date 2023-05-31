const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/api/posts');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific post by post ID
router.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await axios.get(`http://localhost:3001/api/posts/${postId}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new post
router.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  try {
    const response = await axios.post('http://localhost:3001/api/posts', { title, content });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a post by post ID
router.put('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  try {
    const response = await axios.put(`http://localhost:3001/api/posts/${postId}`, { title, content });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a post by post ID
router.delete('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const response = await axios.delete(`http://localhost:3001/api/posts/${postId}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
