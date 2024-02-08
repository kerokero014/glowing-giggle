// Description: Main entry point for the server. This file is responsible for setting up the server and connecting to the database.
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;
const routes = require('./routes');
const cors = require('cors');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema')

// Middleware
app
  .use(cors())
  .use(bodyParser.json())
  .use('/', routes)
  .use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));


// Start server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
