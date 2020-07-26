let express = require("express"),
  path = require("path"),
  // mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  initDb = require("./backend/database/conn");

// dataBaseConfig = require("./backend/database/db");

initDb();

// Set up express js port
const blogRoute = require("./backend/routes/blog.route");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// Setting up static directory
// var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));

app.use(
  express.static(
    path.join(__dirname, "dist/angular8-meanstack-angular-material")
  )
);

// RESTful API root
app.use("/api", blogRoute);

// PORT
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Connected to port " + port);
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next();
});

// Index Route
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "dist/angular8-meanstack-angular-material/index.html")
  );
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
