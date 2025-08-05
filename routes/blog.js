// create a new router
const app = require("express").Router();
const authenticateToken = require("../middleware/authMiddleware");
// import the models
const { Blog, User, Category } = require("../models/index");

// Route to add a new blog
app.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, content, postedBy, category_name } = req.body;
    const blog = await Blog.create({ title, content, postedBy, category_name });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ msg: `Error adding blog ${error}` });
  }
});

//route to get all blogs
app.get("/", authenticateToken, async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        { model: User, as: "bloguser", attributes: ["user_name"] }
      ]
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving blogs" });
  }
});

//route to get a blog by id(Not being used currently)
app.get("/:id", authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving blog" });
  }
});

// Route to update a blog (not being used currently)
app.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { title, content, postedBy } = req.body;
    await Blog.update({ title, content, postedBy }, { where: { id: req.params.id } });
    const updatedBlog = await Blog.findByPk(req.params.id);
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Error updating blog" });
  }
});

// Route to delete a blog(not being used currently)
app.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.destroy({ where: { id: req.params.id } });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error deleting blog" });
  }
});

// export the router
module.exports = app;
