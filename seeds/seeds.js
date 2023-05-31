const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');
const Comment = require('../models/comment-model');
const BlogPost = require('../models/post-model');

const seed = async () => {
  try {
    // Read JSON seed data files
    const commentData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'comment-seeds.json'), 'utf8')
    );
    const postData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'post-seeds.json'), 'utf8')
    );

    // Create Comment instances
    await Comment.bulkCreate(commentData);

    // Create BlogPost instances and associate with Comment
    for (const post of postData) {
      const { comments, ...postWithoutComments } = post;
      const createdPost = await BlogPost.create(postWithoutComments);

      for (const comment of comments) {
        await Comment.create({
          ...comment,
          blogpost_id: createdPost.id,
        });
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    sequelize.close();
  }
};

// Run the seed function
seed();
