import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppErros } from "@shared/errors/AppErrors";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase : CreateCarUseCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;

describe("Create Car", () => {
    
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })
    
    it("should be able to create a new car" , async () => {
        const car = await createCarUseCase.execute({
        name : "Name Car",
        description : "Description Car",
        daily_rate: 100,
        license_plate :"ABC-1234",
        fine_amount: 60,
        brand : "brand",
        category_id : "Category"
        });

        expect(car).toHaveProperty("id");
     });

     it("shoud not be able to create a car with exists license plate ", () => {
        expect(async() => {
            await createCarUseCase.execute({
                name : "Car 1",
                description : "Description Car 1",
                daily_rate: 100,
                license_plate :"ABC-1234",
                fine_amount: 60,
                brand : "brand",
                category_id : "Category"
            });
    
            await createCarUseCase.execute({
                name : "Car 2",
                description : "Description Car 2",
                daily_rate: 100,
                license_plate :"ABC-1234",
                fine_amount: 60,
                brand : "brand",
                category_id : "Category"
            });
        }).rejects.toBeInstanceOf(AppErros);
     });

     it("shoud not be able to create a car with avaliable true by default", async () => {
        const car = await createCarUseCase.execute({
            name : "Car Avaliable",
            description : "Description Car 2",
            daily_rate: 100,
            license_plate :"ABC-1235",
            fine_amount: 60,
            brand : "brand",
            category_id : "Category"
        });

        expect(car.available).toBe(true);
     });
})