//comment model
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const BlogPost = require("/post-model");

class Comment extends Model {}

Comment.init(
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
    commentText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blogPostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "BlogPost",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Comment",
  }
);

Comment.belongsTo(BlogPost, { foreignKey: 'blogPostId' });

module.exports = Comment;
