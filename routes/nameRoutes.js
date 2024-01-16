const nameCtrs = require("../controllers/namesController");
const routes = require("express").Router();

routes.get("/", nameCtrs.myName);

routes.get("/ana", nameCtrs.personOneR);

routes.get("/saul", nameCtrs.personTwoR);

routes.get("/claus", nameCtrs.personThreeR);

module.exports = routes;
