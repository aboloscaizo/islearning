import { IsNotEmpty, IsString } from "class-validator";
import { ValidationMessages } from "src/common/constants/validation.messages";

export class RefreshTokenDto{
    @IsNotEmpty({ message: ValidationMessages.REFRESH_TOKEN.REQUIRED })
    @IsString({ message: ValidationMessages.REFRESH_TOKEN.MUST_BE_STRING })
    refreshToken!: string;
}