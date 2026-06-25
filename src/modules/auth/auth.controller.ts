import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUseCase } from "./use-cases/register.usecase";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginUseCase } from "./use-cases/login.usecase";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { LogoutUseCase } from "./use-cases/logout.usecase";
import { RefreshTokenUseCase } from "./use-cases/refresh-token.usecase";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly logoutUseCase: LogoutUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase
    ) {}

    @Post("register")
    async register(@Body() body: RegisterDto) {
        return this.registerUseCase.executive(body);
    }

    @Post("login")
    async login(@Body() body: LoginDto) {
        return this.loginUseCase.executive(body);
    }

    @Post("Logout")
    async logout(@Body() body: RefreshTokenDto) {
        return this.logoutUseCase.executive(body);
    }

    @Post("refresh")
    async refresh(@Body() body: RefreshTokenDto) {
        return this.refreshTokenUseCase.executive(body);
    }
}