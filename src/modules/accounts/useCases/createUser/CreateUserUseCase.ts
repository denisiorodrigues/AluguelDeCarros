
import { hash } from "bcryptjs" 
import { inject, injectable } from "tsyringe";
import { AppErros } from "../../../../errors/AppErrors";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository : IUsersRepository
    ){}
    
    async execute({name, email, password, driver_license} : ICreateUserDTO) : Promise<void> {

        const passwordHas = await hash(password, 8);

        const userEmailExists = await this.usersRepository.findByEmail(email);

        if(userEmailExists){
            throw new AppErros("User e-mail already exist" );
        }

        await this.usersRepository.create({
            name, 
            email, 
            password: passwordHas, 
            driver_license
        } );
    }
}

export { CreateUserUseCase }