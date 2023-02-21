"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
const auth_guard_1 = require("./auth.guard");
const firebase_service_1 = require("../firebase/firebase.service");
const roles_decorator_1 = require("./roles.decorator");
let AuthController = class AuthController {
    constructor(db, firebase) {
        this.db = db;
        this.firebase = firebase;
    }
    async register(req) {
        const user = req["user"];
        const _user = await this.db.user.create({
            data: {
                uuid: user.uid,
                email: user.email,
                username: user.displayName || "default_name",
                role: "USER",
            }
        });
        const auth = this.firebase.app.auth();
        await auth.setCustomUserClaims(user.uid, {
            uid: _user.uuid,
            role: _user.role,
            test: 98372418327471329857428748917324987132984712
        });
        return _user;
    }
    async me(req) {
        return req["user"];
    }
    async admin(req) {
        return req["user"];
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/me"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, roles_decorator_1.RBAC)(roles_decorator_1.Role.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("/admin"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "admin", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [db_service_1.DbService, firebase_service_1.FirebaseService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map