export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    ALL = "*"
}
export declare const ROLES_KEY = "roles";
export declare const RBAC: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
