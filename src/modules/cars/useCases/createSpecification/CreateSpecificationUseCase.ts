import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {}
    execute({ name, description }: IRequest) {
        const spesificationAlreadyExist =
            this.specificationsRepository.findByName(name);

        if (spesificationAlreadyExist) {
            throw new Error("Speficication already exists!");
        }

        this.specificationsRepository.create({ name, description });
    }
}
export { CreateSpecificationUseCase };
