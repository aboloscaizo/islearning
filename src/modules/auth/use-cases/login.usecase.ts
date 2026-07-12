import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/modules/users/repositories/user.repository";
import { LoginDto } from "../dto/login.dto";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "../constants/auth.errors";
import { PasswordHasherStrategy } from "../../../common/secret/hashing/password.hasher.strategy";
import { AuthTokenFactory } from "../factories/auth-token.factory";
import { SessionRepository } from "src/modules/sessions/repositories/session.repository";
import { SessionStatus } from "@prisma/client";
@Injectable()
export class LoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasherStrategy: PasswordHasherStrategy,
        private readonly authTokenFactory: AuthTokenFactory,
        private readonly sessionRepository: SessionRepository,
    ) { }
    async executive(data: LoginDto) {
        const user = await this.userRepository.findByEmail(data.email)
        if (!user) {
            throw new AppException(AuthError.INVALID_CREDENTIALS)
        }
        const isPasswordValid = await this.passwordHasherStrategy.compare(data.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new AppException(AuthError.INVALID_CREDENTIALS)
        }
        await this.sessionRepository.revokeAllActiveByUserId(user.id)
        const loginResponse = await this.authTokenFactory.createLoginResponse(user);
        const hashedRefreshToken = await this.passwordHasherStrategy.hash(loginResponse.refreshToken);
        await this.sessionRepository.create({
            userId: user.id,
            refreshTokenHash: hashedRefreshToken,
            status: SessionStatus.ACTIVE
        })
        return await this.authTokenFactory.createLoginResponse(user);
    }
}