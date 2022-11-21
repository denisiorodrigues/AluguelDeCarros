import { inject, injectable } from "tsyringe";
import { AppErros } from "@shared/errors/AppErrors";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {

    constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository) {}

    async execute({ name, description }: IRequest) : Promise<void> {

        const spesificationAlreadyExist =
            await this.specificationsRepository.findByName(name);

        if (spesificationAlreadyExist) {
            throw new AppErros("Speficication already exists!");
        }

        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };