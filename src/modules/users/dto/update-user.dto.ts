import { Role, Status } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ValidationMessages } from "src/common/constants/validation.messages";
export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty({message: ValidationMessages.EMAIL.REQUIRED})
    @IsEmail({}, {message: ValidationMessages.EMAIL.INVALID})
    email?: string;
  
    @IsOptional()
    @IsNotEmpty({message: ValidationMessages.PASSWORD.REQUIRED})
    @IsString({message: ValidationMessages.PASSWORD.MUST_BE_STRING})
    @MinLength(3, {message: ValidationMessages.PASSWORD.MIN_LENGTH})
    password?: string;

    @IsOptional()
    @IsEnum(Role, { message: ValidationMessages.ROLE.INVALID })
    role?: Role;

    @IsOptional()
    @IsEnum(Status, { message: ValidationMessages.STATUS.INVALID })
    status?: Status;
}