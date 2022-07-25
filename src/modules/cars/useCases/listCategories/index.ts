import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const catgoriesRpository = CategoriesRepository.getIstance();

const listCategoriesUseCase = new ListCategoriesUseCase(catgoriesRpository);

const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
);

export { listCategoriesController };
