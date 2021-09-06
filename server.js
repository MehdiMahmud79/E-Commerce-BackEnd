const express = require('express');
const routes = require('./routes');
const {
  logger,
  jsonMiddleWare,
  urlMiddleWarre,
} = require("./helpers/middleWares");

// import sequelize connection
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;

// Init and Body Parser Middleware
app.use(logger);
app.use(jsonMiddleWare);
app.use(urlMiddleWarre);

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});