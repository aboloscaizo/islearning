import { Module } from "@nestjs/common";
import { RegisterUseCase } from "./use-cases/register.usecase";
import { AuthController } from "./auth.controller";
import { UserModule } from "../users/user.module";
import { LoginUseCase } from "./use-cases/login.usecase";
import { BcryptPasswordHasherStrategy } from "./strategies/bcrypt-password-hasher.strategy";
import { PasswordHasherStrategy } from "./strategies/password.hasher.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthTokenFactory } from "./factories/auth-token.factory";
import { SessionRepository } from "../sessions/repositories/session.repository";
import { RefreshTokenUseCase } from "./use-cases/refresh-token.usecase";
import { LogoutUseCase } from "./use-cases/logout.usecase";

@Module({
    providers: [
        RegisterUseCase,
        LoginUseCase,
        BcryptPasswordHasherStrategy,
        AuthTokenFactory,
        SessionRepository,
        LogoutUseCase,
        RefreshTokenUseCase,
        {
            provide: PasswordHasherStrategy,
            useClass: BcryptPasswordHasherStrategy
        }
    ],
    controllers: [AuthController],
    imports: [UserModule,
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