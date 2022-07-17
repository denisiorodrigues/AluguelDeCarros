import { Specification } from "../models/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    findByName(name: string): Specification {
        throw new Error("Method not implemented.");
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            create_at: new Date(),
        });

        this.specifications.push(specification);
    }
}
