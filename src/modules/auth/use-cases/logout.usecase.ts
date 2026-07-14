import { Injectable } from "@nestjs/common";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { JwtService } from "@nestjs/jwt";
import { AppException } from "src/common/exceptions/app.exception";
import { AuthError } from "../constants/auth.errors";
import { UserRepository } from "src/modules/users/repositories/user.repository";
import { SessionRepository } from "src/modules/sessions/repositories/session.repository";
import { PasswordHasherStrategy } from "../../../common/secret/hashing/password.hasher.strategy";
import { SessionStatus } from "@prisma/client";
import { SessionStateFactory } from "src/modules/sessions/states/session-state.factory";

@Injectable()
export class LogoutUseCase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly sessionRepository: SessionRepository,
        private readonly passwordHashStrategy: PasswordHasherStrategy,
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
        if(!session){
            throw new AppException(AuthError.ACTIVE_SESSION_NOT_FOUND);
        }
        const sessionState = this.sessionStateFactory.create(session.status);
        sessionState.ensureCanLogout();
        const isRefreshTokenCorrect = await this.passwordHashStrategy.compare(data.refreshToken, session.refreshTokenHash);
        if(!isRefreshTokenCorrect){
            throw new AppException(AuthError.REFRESH_TOKEN_INVALID);
        }
        await this.sessionRepository.updateStatus(session.id, SessionStatus.REVOKED);
        return {
            message: "Đăng xuất thành công"
        }
    }
}