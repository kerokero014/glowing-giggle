const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const nameRoutes = require("./routes/nameRoutes");
const mongodb = require("./db/connect");


app.use("/", nameRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});