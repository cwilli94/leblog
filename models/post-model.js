const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Comment = require('./comment-model');

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'BlogPost',
    freezeTableName: true,
    underscored: true,
  }
);

// Set up associations
BlogPost.hasMany(Comment, {
  foreignKey: 'blogPostId',
  onDelete: 'CASCADE',
});

module.exports = BlogPost;
