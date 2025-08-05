const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();

const sequelize = require("./config/connection");
const routes = require("./routes");

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

const PORT = process.env.PORT || 3001;

// has the --rebuild parameter been passed as a command line param?
const rebuild = process.argv[2] === "--rebuild";

// Sync database
sequelize.sync({ force: rebuild }).then(() => {
  app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
});

// run seeds
if (process.env.NODE_ENV === "development") {
  require("./seeding/seeds.js"); // Path to your seeder
}
