import { Injectable } from "@nestjs/common";
import firebase, { ServiceAccount } from "firebase-admin"

const serviceAccountConfig: ServiceAccount = {
    projectId: process.env.project_id,
    clientEmail: process.env.client_email,
    privateKey: process.env.private_key,
}

@Injectable()
export class FirebaseService {
    app!: firebase.app.App;

    constructor() {
        if (firebase.apps.length === 0) {
            this.app = firebase.initializeApp({
                credential: firebase.credential.cert(serviceAccountConfig),
            })
        } else {
            this.app = firebase.apps[0]
        }
    }
}