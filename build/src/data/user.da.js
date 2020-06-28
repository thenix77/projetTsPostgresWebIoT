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
const conexion_1 = __importDefault(require("../database/conexion"));
class Data {
    Listar(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const ssql = 'select concat(u.apellidop,\', \',u.nombre) usuario, email,active,login,logindate,photo,r.id,r.nombre rol ' +
                'from users u ' +
                'inner join rols r on r.id = u.rolid ' +
                'where ' +
                '   active=true ' +
                'order by login desc,logindate desc ' +
                'limit 10';
            const { rows } = yield conexion_1.default.query(ssql);
            return { auth: true, users: rows };
        });
    }
    Show(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const ssql = 'select * from users ' +
                'where id=$1';
            const { rows } = yield conexion_1.default.query(ssql, [userid]);
            return rows[0];
        });
    }
}
const data = new Data();
exports.default = data;
