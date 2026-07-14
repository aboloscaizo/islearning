import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SessionRepository } from "src/modules/sessions/repositories/session.repository";
import { UserRepository } from "src/modules/users/repositories/user.repository";
import { PasswordHasherStrategy } from "../../../common/secret/hashing/password.hasher.strategy";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "../constants/auth.errors";
import { SessionStatus } from "@prisma/client";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { AuthTokenFactory } from "../factories/auth-token.factory";
import { SessionStateFactory } from "src/modules/sessions/states/session-state.factory";

@Injectable()
export class RefreshTokenUseCase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly sessionRepository: SessionRepository,
        private readonly passwordHashStrategy: PasswordHasherStrategy,
        private readonly authTokenFactory: AuthTokenFactory,
        private readonly sessionStateFactory: SessionStateFactory,
    ) { }
    async executive(data: RefreshTokenDto) {
        let payload;
        try {
            payload = await this.jwtService.verify(data.refreshToken);
        } catch (error) {
            throw new AppException(AuthError.REFRESH_TOKEN_INVALID);
        }
        if (payload.type !== "refresh") {
            throw new AppException(AuthError.INVALID_TOKEN_TYPE);
        }
        const user = await this.userRepository.findOne(payload.sub);
        if (!user) {
            throw new AppException(AuthError.USER_NOT_FOUND);
        }
        const session = await this.sessionRepository.findLatestByUserId(user.id);
        if (!session) {
            throw new AppException(AuthError.ACTIVE_SESSION_NOT_FOUND);
        }
        const sessionState = this.sessionStateFactory.create(session.status);
        sessionState.ensureCanRefresh();
        const isRefreshTokenCorrect = await this.passwordHashStrategy.compare(data.refreshToken, session.refreshTokenHash);
        if (!isRefreshTokenCorrect) {
            throw new AppException(AuthError.REFRESH_TOKEN_INVALID);
        }
        const accessToken = await this.authTokenFactory.createAccessToken(user);
        return {
            accessToken,
            message: "Refresh token thành công"
        }
    }
}