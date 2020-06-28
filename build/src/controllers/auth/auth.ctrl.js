"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_da_1 = __importDefault(require("../../data/auth.da"));
class Ctrl {
    Index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield auth_da_1.default.listar();
            return res.status(200).json(users);
        });
    }
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            let rst = yield auth_da_1.default.Register(user);
            return res.status(200).json({ rst });
        });
    }
    SignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = req.body;
            console.log(login);
            const rst = yield auth_da_1.default.SignIn(login);
            return res.status(200).header({ 'token': rst.token }).json(rst);
        });
    }
    Logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rst = yield auth_da_1.default.Logout(req.userId);
            return res.status(200).json(rst);
        });
    }
    Verifica(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({ auth: true, msg: 'authorizado' });
        });
    }
}
const ctrl = new Ctrl();
exports.default = ctrl;
