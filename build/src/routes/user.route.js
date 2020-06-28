"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_ctrl_1 = __importDefault(require("../controllers/users.ctrl"));
const token_1 = require("../lib/token");
class Rutas {
    constructor() {
        this.router = express_1.Router();
        this.routeGet();
        this.routePost();
    }
    routeGet() {
        this.router.get('/', token_1.validationToken, users_ctrl_1.default.Index);
        this.router.get('/show', token_1.validationToken, users_ctrl_1.default.Show);
    }
    routePost() {
        //  this.router.post('/create', validationToken, ctrl.Create)
        //this.router.post('/update', validationToken , ctrl.Update)
    }
}
const rutas = new Rutas();
exports.default = rutas.router;
