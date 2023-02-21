import { DbService } from "src/db/db.service";
import { Request } from "express";
import { FirebaseService } from "src/firebase/firebase.service";
export declare class AuthController {
    private db;
    private firebase;
    constructor(db: DbService, firebase: FirebaseService);
    register(req: Request): Promise<import("@prisma/client").User>;
    me(req: Request): Promise<any>;
    admin(req: Request): Promise<any>;
}
