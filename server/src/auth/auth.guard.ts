import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { UserInfo } from "firebase-admin/lib/auth/user-record";
import { FirebaseService } from "src/firebase/firebase.service";
import { ROLES_KEY, Role } from "./roles.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly firebase: FirebaseService, private readonly reflector: Reflector) { }
    async canActivate(context: ExecutionContext) {
        const role = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const req: Request = context.switchToHttp().getRequest();
        const token = req.headers.authorization;
        if (token !== null && token !== "") {
            try {
                const user = await this.firebase.app
                    .auth()
                    .verifyIdToken(token.replace("Bearer ", ""));
                // console.log(user)
                req['user'] = user as unknown as UserInfo;
                console.log(role)
                if (role) {
                    console.log(user.role)
                    console.log(role)
                    return role.includes(user.role);
                }
                return true
            } catch (err) {
                console.error(err);
                return false
            }
        }
    }
}