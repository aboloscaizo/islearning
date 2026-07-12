import { Module } from "@nestjs/common";
import { PasswordHasherStrategy } from "./password.hasher.strategy";
import { BcryptPasswordHasherStrategy } from "./bcrypt-password-hasher.strategy";

@Module({
    providers:[
        {
            provide: PasswordHasherStrategy,
            useClass: BcryptPasswordHasherStrategy
        }
    ],
    exports:[PasswordHasherStrategy]
})
export class HashingModule {}