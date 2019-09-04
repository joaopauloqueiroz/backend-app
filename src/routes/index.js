const express = require("express");
const middleware = require("../middlewares");
const routes = express.Router();
const IdeaController = require("../controller/IdeaController");
const UserController = require("../controller/UserController");
const ViewsController = require("../controller/ViewsController");

routes.get("/", ViewsController.index);

routes.post("/users/create", UserController.store);
routes.post("/users/login", UserController.login);

routes.post("/ideas/create", middleware, IdeaController.store);
routes.put("/ideas/update", middleware, IdeaController.edit);
routes.delete("/delete/:_id", middleware, IdeaController.destroy);
routes.get("/get-all/:id", middleware, IdeaController.index);

module.exports = routes;
