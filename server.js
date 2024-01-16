const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const nameRoutes = require("./routes/nameRoutes");
const mongodb = require("./db/connect");


app.use("/", nameRoutes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});