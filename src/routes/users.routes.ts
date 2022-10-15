import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/CreateUSerController";

const usersRouters = Router();

const createUSerController = new CreateUserController();

usersRouters.post("/", createUSerController.handle);

export { usersRouters }