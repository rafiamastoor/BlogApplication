const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const blogRoutes = require("./blog");
const categoryRoutes = require("./category");

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
