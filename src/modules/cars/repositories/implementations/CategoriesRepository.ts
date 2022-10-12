import { Repository, getRepository } from "typeorm";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

import { Category } from "../../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
    
    private repository : Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({name, description});

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        return await this.repository.find();
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({name});

        return category;
    }
}

export { CategoriesRepository };
