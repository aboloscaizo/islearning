import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUseCase } from "./use-cases/register.usecase";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginUseCase } from "./use-cases/login.usecase";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase
    ) {}

    @Post("register")
    async register(@Body() body: RegisterDto) {
        return this.registerUseCase.executive(body);
    }

    @Post("login")
    async login(@Body() body: LoginDto) {
        return this.loginUseCase.executive(body);
    }
}