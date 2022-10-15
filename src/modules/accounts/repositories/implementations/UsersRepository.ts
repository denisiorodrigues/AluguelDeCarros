import { IUsersRepository } from "../IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";

class UsersRepository implements IUsersRepository {
    private respository : Repository<User>;

    constructor(){
        this.respository = getRepository(User);
    }

    async create( { name, username, password, email, driver_license } ): Promise<void> {
        const user = this.respository.create({ 
            name, 
            password, 
            email, 
            driver_license 
        });
        
        await this.respository.save(user);
    }

}

export { UsersRepository }