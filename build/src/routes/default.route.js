"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const default_ctrl_1 = __importDefault(require("../controllers/default.ctrl"));
class Rutas {
    constructor() {
        this.router = express_1.Router();
        this.routeGet();
        this.routePost();
    }
    routeGet() {
        this.router.get('/', default_ctrl_1.default.index);
    }
    routePost() {
    }
}
const rutas = new Rutas();
exports.default = rutas.router;
