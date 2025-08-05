const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}

Blog.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
},
  {
    sequelize,
    modelName: "Blog",
    timestamps: true,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Blog;
