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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const firebase_service_1 = require("../firebase/firebase.service");
const roles_decorator_1 = require("./roles.decorator");
let AuthGuard = class AuthGuard {
    constructor(firebase, reflector) {
        this.firebase = firebase;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const role = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization;
        if (token !== null && token !== "") {
            try {
                const user = await this.firebase.app
                    .auth()
                    .verifyIdToken(token.replace("Bearer ", ""));
                req['user'] = user;
                console.log(role);
                if (role) {
                    console.log(user.role);
                    console.log(role);
                    return role.includes(user.role);
                }
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
        }
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService, core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map