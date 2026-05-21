import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/users/repositories/user.repository";
import { LoginDto } from "../dto/login.dto";
import { UserMapper } from "src/modules/users/mappers/user.mapper";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "../constants/auth.errors";
@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository
    ) {}
    async executive(data: LoginDto) {
        const user = await this.userRepository.findByEmail(data.email)
        if(!user){
            throw new AppException(AuthError.INVALID_CREDENTIALS)
        }
        const isPasswordValid = user.passwordHash === data.password;
        if (!isPasswordValid) {
            throw new AppException(AuthError.INVALID_CREDENTIALS)
        }

        return {
            user: UserMapper.toResponse(user),
        }
    }
}