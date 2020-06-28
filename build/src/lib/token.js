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
exports.validationToken = exports.token = void 0;
const jwt_then_1 = __importDefault(require("jwt-then"));
const apiToken = 'La$$ZDXe|f8F7Uf[F2J4Se]2</{916eds+d>*M=8)fOcc)NTF3jlJADcjow.dQ?';
function token(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = '';
        if (id > 0) {
            token = yield jwt_then_1.default.sign({ id: id }, apiToken);
        }
        return token;
    });
}
exports.token = token;
exports.validationToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('token');
    if (!token)
        return res.status(200).json({ auth: false, msg: 'no autorizado' });
    try {
        const payload = (yield jwt_then_1.default.verify(token, apiToken || "testToken"));
        req.userId = payload.id;
    }
    catch (error) {
        return res.status(200).json({ auth: false, acceso: "No Autorizado" });
    }
    next();
});
