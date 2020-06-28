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
const user_da_1 = __importDefault(require("../data/user.da"));
class Ctrl {
    Index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rst = yield user_da_1.default.Listar(req.userId);
            return res.status(200).json(rst);
        });
    }
    Show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = req.userId;
            const rst = yield user_da_1.default.Show(userid);
            return res.status(200).json(rst);
        });
    }
    Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
const ctrl = new Ctrl();
exports.default = ctrl;
