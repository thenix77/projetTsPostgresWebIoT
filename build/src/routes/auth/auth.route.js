"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_ctrl_1 = __importDefault(require("../../controllers/auth/auth.ctrl"));
const token_1 = require("../../lib/token");
class Rutas {
    constructor() {
        this.router = express_1.Router();
        this.routeGet();
        this.routePost();
    }
    routeGet() {
        this.router.get('/', token_1.validationToken, auth_ctrl_1.default.Index);
        this.router.get('/logout', token_1.validationToken, auth_ctrl_1.default.Logout);
        this.router.get('/verified', token_1.validationToken, auth_ctrl_1.default.Verifica);
    }
    routePost() {
        this.router.post('/register', auth_ctrl_1.default.Register);
        this.router.post('/signin', auth_ctrl_1.default.SignIn);
    }
}
const rutas = new Rutas();
exports.default = rutas.router;
