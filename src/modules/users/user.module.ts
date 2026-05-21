import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./repositories/user.repository";
import { CreateUserUseCase } from "./use-cases/create-user.usecase";
import { FindAllUsersUseCase } from "./use-cases/find-all-user.usecase";
import { FindUserByIdUseCase } from "./use-cases/find-user-by-id.usecase";
import { UpdateUserUseCase } from "./use-cases/update-user.usecase";
import { DeleteUserUseCase } from "./use-cases/delete.usecase";

@Module({
    providers: [
        // UserService,
        CreateUserUseCase,
        FindAllUsersUseCase,
        FindUserByIdUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        UserRepository
    ],
    controllers: [UserController],
    exports: [UserRepository]
})
export class UserModule { }