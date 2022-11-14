import { IUsersRepository } from "../IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "@modules/accounts/entities/User";

class UsersRepository implements IUsersRepository {
    private respository : Repository<User>;

    constructor(){
        this.respository = getRepository(User);
    }
    
    async findByEmail(email: string): Promise<User> {
        const user = this.respository.findOne({email});

        return user;
    }

    async create( { name, password, email, driver_license, avatar, id} ): Promise<void> {
        const user = this.respository.create({ 
            name, 
            password, 
            email, 
            driver_license,
            avatar,
            id
        });
        
        await this.respository.save(user);
    }

    async findById(id: string): Promise<User> {
        const user = this.respository.findOne(id);
        return user;
    }

}

export { UsersRepository }