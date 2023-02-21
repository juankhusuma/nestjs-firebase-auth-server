
import { SetMetadata } from '@nestjs/common';

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    ALL = "*"
}

export const ROLES_KEY = 'roles';
export const RBAC = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
