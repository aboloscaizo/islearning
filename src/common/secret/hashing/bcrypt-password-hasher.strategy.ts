import { Injectable } from "@nestjs/common";
import { PasswordHasherStrategy } from "./password.hasher.strategy";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptPasswordHasherStrategy implements PasswordHasherStrategy {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
    async compare(password: string, passwordHashed: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordHashed);
    }
}
