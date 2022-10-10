import { Repository, getRepository } from "typeorm";
import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    
    private static INSTANCE : CategoriesRepository;
    
    private repository : Repository<Category>;

    private constructor() {
        this.repository = getRepository(Category);
    }

    public static getIstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;
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
