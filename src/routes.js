import { Router } from "express";

import auth from "./middlewares/auth"

import HelloController from "./controllers/HelloController";
import SessionsController from "./controllers/SessionsController";
import UsersController from "./controllers/UsersController";
import RepositoriesController from "./controllers/RepositoriesController";
import ClientsController from "./controllers/ClientsController";

const routes = new Router()

routes.post('/sessions', SessionsController.create)

routes.get('/hello', HelloController.index)

routes.use(auth)

// REST
routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.show)
routes.post('/users', UsersController.create)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.destroy)

routes.get('/clients', ClientsController.index)
routes.get('/clients-decript', ClientsController.indexDecript)
routes.post('/clients', ClientsController.create)
routes.delete('/clients/:client_id', ClientsController.destroy)


export default routes