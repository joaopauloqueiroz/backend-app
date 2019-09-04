const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
const port = 3500;
mongoose.connect(
  "mongodb+srv://ideas:200*technology@cluster0-jqlte.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(cors());
app.use(bodyParser());
app.use(routes);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.listen(process.env.PORT || port, () => {
  console.log(`Server is runing on ${port}`);
});
