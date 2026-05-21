import { HttpException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/users/repositories/user.repository";
import { RegisterDto } from "../dto/register.dto";
import { UserMapper } from "src/modules/users/mappers/user.mapper";
import { AuthError } from "../constants/auth.errors";
import { AppException } from "src/common/exceptions/app.exception";

@Injectable()
export class RegisterUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) { }
    async executive(data: RegisterDto) {
        const existingUser = await this.userRepository.findByEmail(data.email)
        if (existingUser) {
            throw new AppException(AuthError.EMAIL_ALREADY_EXISTS)
        }
        const user = await this.userRepository.createUser({
            email: data.email,
            passwordHash: data.password,
        })
        return {
            user: UserMapper.toResponse(user),
            message: "User created successfully"
        }
    }
}