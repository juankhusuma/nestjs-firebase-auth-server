import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { AuthGuard } from "./auth.guard";
import { Request } from "express";
import { UserInfo } from "firebase-admin/lib/auth/user-record";
import { FirebaseService } from "src/firebase/firebase.service";
import { RBAC, Role } from "./roles.decorator";

@Controller("auth")
export class AuthController {
    constructor(private db: DbService, private firebase: FirebaseService) { }

    @UseGuards(AuthGuard)
    @Post("/register")
    async register(@Req() req: Request) {
        const user = req["user"] as UserInfo;

        const _user = await this.db.user.create({
            data: {
                uuid: user.uid,
                email: user.email,
                username: user.displayName || "default_name",
                role: "USER",
            }
        })
        const auth = this.firebase.app.auth()
        await auth.setCustomUserClaims(user.uid, {
            uid: _user.uuid,
            role: _user.role,
            test: 98372418327471329857428748917324987132984712
        })
        // await auth.revokeRefreshTokens(user.uid)
        return _user;
    }

    @UseGuards(AuthGuard)
    @Get("/me")
    async me(@Req() req: Request) {
        return req["user"];
    }

    @RBAC(Role.ADMIN)
    @UseGuards(AuthGuard)
    @Get("/admin")
    async admin(@Req() req: Request) {
        return req["user"];
    }
}
