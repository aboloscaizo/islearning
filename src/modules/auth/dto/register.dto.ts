import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ValidationMessages } from "src/common/constants/validation.messages";

export class RegisterDto {
    @IsEmail({}, { message: ValidationMessages.EMAIL.INVALID })
    @IsNotEmpty({ message: ValidationMessages.EMAIL.REQUIRED })
    email!: string;

    @IsNotEmpty({ message: ValidationMessages.PASSWORD.REQUIRED })
    @MinLength(3, { message: ValidationMessages.PASSWORD.MIN_LENGTH })
    password!: string;
}