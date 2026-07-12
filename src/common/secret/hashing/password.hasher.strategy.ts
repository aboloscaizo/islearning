export abstract class PasswordHasherStrategy {
    abstract hash(password: string): Promise<string>;
    abstract compare(password: string, passwordHashed: string): Promise<boolean>;
}
