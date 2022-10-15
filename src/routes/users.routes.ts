import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUSerController = new CreateUserController();

usersRoutes.post("/", createUSerController.handle);

export { usersRoutes }