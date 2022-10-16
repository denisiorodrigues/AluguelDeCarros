import { inject, injectable } from "tsyringe";
import { AppErros } from "../../../../errors/AppErrors";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {

    constructor(@inject("CategoriesRepository") private categoriesRepository: ICategoriesRepository) {}

    async execute({ name, description }: IRequest): Promise<void> {
        
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppErros("Category Alredy exists!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
