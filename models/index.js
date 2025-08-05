// import all models
const Blog = require("./blog");
const Category = require("./category");
const User = require("./user");

Blog.belongsTo(User, {
  foreignKey: "postedBy",
  as: "bloguser",
});

Blog.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Category.hasMany(Blog, {
  foreignKey: "categoryId",
  as: "blogcategory",
});

User.hasMany(Blog, { foreignKey: "postedBy" });

module.exports = {
  User,
  Blog,
  Category,
};

