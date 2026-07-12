import { Role, Status } from "@prisma/client";
export type UpdateUserRepositoryInput = {
    id?: number;
    email?: string;
    passwordHash?: string;
    role?: Role;
    status?: Status;
}