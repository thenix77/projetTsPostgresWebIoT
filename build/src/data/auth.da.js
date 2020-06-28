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
const users_model_1 = require("../models/users.model");
const token_1 = require("../lib/token");
class DataAcess {
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const ssql = "select * from users";
            const { rows } = yield conexion_1.default.query(ssql);
            return rows;
        });
    }
    Register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [
                user.nombre,
                user.apellidop,
                user.apellidom,
                user.dni,
                user.email,
                yield users_model_1.PasswordHash(user.password),
                user.rolid,
            ];
            const ssql = "insert into users(nombre,apellidop,apellidom,dni,email,password,rolid) " +
                "values($1,$2,$3,$4,$5,$6,$7);";
            try {
                const { rowCount } = yield conexion_1.default.query(ssql, values);
                return { insert: true, msg: "se creo el registro" };
            }
            catch (error) {
                return { insert: false, msg: error.detail };
            }
        });
    }
    SignIn(login) {
        return __awaiter(this, void 0, void 0, function* () {
            let validate = false;
            let user;
            const ssql = "select * from users where active=true and dni like $1 ";
            try {
                const { rows } = yield conexion_1.default.query(ssql, [login.dni]);
                user = rows[0];
                if (user.login)
                    return { token: null, msg: "usuario ya validado...!" };
                if (user) {
                    validate = yield users_model_1.ValidatePassword(login.password, user.password);
                    if (yield users_model_1.ValidatePassword(login.password, user.password)) {
                        const upssql = "update users set logindate=now(),login=true where id=$1";
                        yield conexion_1.default.query(upssql, [user.id]);
                        return { token: yield token_1.token(user.id || 0), auth: true, msg: "autorizado" };
                    }
                    else {
                        return { token: null, auth: false, msg: "credencial no valida" };
                    }
                }
                return { token: "", msg: "usuario no valido" };
            }
            catch (error) {
                return { token: "", msg: "usuario no valido" };
            }
        });
    }
    Logout(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const ssql = "update users set login=false where id=$1";
            yield conexion_1.default.query(ssql, [userid]);
            console.log(`userid: ${userid}`);
            return { logout: true, msg: "logout" };
        });
    }
}
const da = new DataAcess();
exports.default = da;
