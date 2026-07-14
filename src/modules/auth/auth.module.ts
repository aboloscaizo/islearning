import { Module } from "@nestjs/common";
import { RegisterUseCase } from "./use-cases/register.usecase";
import { AuthController } from "./auth.controller";
import { UserModule } from "../users/user.module";
import { LoginUseCase } from "./use-cases/login.usecase";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthTokenFactory } from "./factories/auth-token.factory";
import { SessionRepository } from "../sessions/repositories/session.repository";
import { RefreshTokenUseCase } from "./use-cases/refresh-token.usecase";
import { LogoutUseCase } from "./use-cases/logout.usecase";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt/jwt.strategies";
import { HashingModule } from "src/common/secret/hashing/hashing.module";
import { SessionStateFactory } from "../sessions/states/session-state.factory";

@Module({
    providers: [
        RegisterUseCase,
        LoginUseCase,
        AuthTokenFactory,
        SessionRepository,
        LogoutUseCase,
        RefreshTokenUseCase,
        JwtStrategy,
        SessionStateFactory,
    ],
    controllers: [AuthController],
    imports: [UserModule,  
        HashingModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET_KEY') || "jwt-secret-key",
                signOptions: { expiresIn: Number(config.get<string>('JWT_EXPIRES_IN')) || 6000 }
            })
        })
    ]
})
export class AuthModule { }