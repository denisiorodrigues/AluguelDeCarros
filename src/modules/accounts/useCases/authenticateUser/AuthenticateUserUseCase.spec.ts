import { AppErros } from "../../../../errors/AppErrors";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let autheticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUSerUseCase : CreateUserUseCase; 

describe("Authenticate USer", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    autheticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUSerUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user",  async () => {
    const user : ICreateUserDTO = {
        driver_license : "000123",
        email  : "user@test.com",
        password: "1234",
        name : "User Test"
    }

    await createUSerUseCase.execute(user);

    const result = await autheticateUserUseCase.execute({ 
        email: user.email, 
        password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to autheticate an nonexistent user", () => {
    expect(async () => {
        await autheticateUserUseCase.execute({
            email: "false@email.com",
            password: "1234"
        });
    }).rejects.toBeInstanceOf(AppErros);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
        const user : ICreateUserDTO = {
            driver_license : "00099",
            email: "email@test.com",
            password: "1234",
            name: "User Test Error"
        };

        await createUSerUseCase.execute(user);

        await autheticateUserUseCase.execute({
            email: user.email,
            password : "4321"
        });
    }).rejects.toBeInstanceOf(AppErros);
  });
})