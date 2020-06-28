"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_ctrl_1 = __importDefault(require("../controllers/projects.ctrl"));
const token_1 = require("../lib/token");
class Rutas {
    constructor() {
        this.router = express_1.Router();
        this.routeGet();
        this.routePost();
    }
    routeGet() {
        this.router.get('/', token_1.validationToken, projects_ctrl_1.default.Index);
        this.router.get('/show/:id', token_1.validationToken, projects_ctrl_1.default.Show);
        this.router.get('/active/:id', token_1.validationToken, projects_ctrl_1.default.Active);
    }
    routePost() {
        this.router.post('/create', token_1.validationToken, projects_ctrl_1.default.Create);
        this.router.post('/update', token_1.validationToken, projects_ctrl_1.default.Update);
    }
}
const rutas = new Rutas();
exports.default = rutas.router;
