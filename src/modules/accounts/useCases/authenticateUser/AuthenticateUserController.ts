import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle (request: Request, response : Response) : Promise<Response> {
        const { password, email } = request.body;


        const authenticateUserCase = container.resolve(AuthenticateUserUseCase);

        const token = await authenticateUserCase.execute({email, password});

        return response.json(token);
    }
}

export { AuthenticateUserController }