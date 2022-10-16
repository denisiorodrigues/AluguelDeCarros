import { inject, injectable, singleton } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppErros } from "../../../../errors/AppErrors";

interface IRequest {
    email: string;
    password: string;
}

interface IReponse {
    user: {
        name: string,
        email: string
    };

    token : string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository") 
        private usersRepository : IUsersRepository
    ){}

    async execute ({email, password}: IRequest) : Promise<IReponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppErros("Email or password incorrect")
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppErros("Email or password incorrect")
        }

        const token = sign({}, "ccafd93b1f11c4a3b5666200031e9aac" , {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IReponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }