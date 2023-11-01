const cors = require("cors");
const express = require("express");
const app = express();
const dbConnect = require("./configs/dbConnect")

global.__basedir = __dirname;
global.baseUrl = "http://localhost:8080";

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

const initRoutes = require("./routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);
dbConnect();

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});