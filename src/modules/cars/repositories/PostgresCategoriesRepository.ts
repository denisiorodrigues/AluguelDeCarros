import { Category } from "../models/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
    findByName(name: string): Category {
        console.log(name);
        throw new Error("Method not implemented.");
    }
    list(): Category[] {
        throw new Error("Method not implemented.");
    }
    create({ name, description }: ICreateCategoryDTO): void {
        console.log(name, description);
        throw new Error("Method not implemented.");
    }
}

export { PostgresCategoriesRepository };
