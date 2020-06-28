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
            const ssql = 'select * from projects where userid=$1 order by active desc,created desc';
            const { rows } = yield conexion_1.default.query(ssql, [userid]);
            return rows;
        });
    }
    Insert(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const ssql = 'insert into projects(nombre,descripcion,userid) ' +
                'values ($1,$2,$3)  RETURNING id';
            try {
                let { rows } = yield conexion_1.default.query(ssql, [project.nombre, project.descripcion, project.userid]);
                return ({ insert: true, msg: 'registro correcto', id: rows[0].id });
            }
            catch (error) {
                return ({ insert: false, msg: error.detail, id: 0 });
            }
        });
    }
    Show(id, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            const ssql = 'select * from projects ' +
                'where id=$1 and userid=$2';
            const { rows } = yield conexion_1.default.query(ssql, [id, userid]);
            return rows;
        });
    }
    Update(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const ssql = "update projects set " +
                "nombre=$1, " +
                "descripcion=$2, " +
                "active=$3, " +
                "updated=$4 " +
                "where userid=$5 and id=$6;";
            const values = [
                project.nombre,
                project.descripcion,
                project.active,
                project.updated,
                project.userid,
                project.id
            ];
            try {
                yield conexion_1.default.query(ssql, values);
                return ({ update: true, msg: 'registro actualizado' });
            }
            catch (error) {
                return ({ update: false, msg: error.detail });
            }
        });
    }
    Active(userdId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ssql = `update projects
                        set
                            active=  (select (not active) from projects where id=$1)
                    where 
                        id=$1 and userid=$2;`;
            try {
                yield conexion_1.default.query(ssql, [id, userdId]);
                return { active: true, msg: 'registro actualizado' };
            }
            catch (error) {
                return { active: true, msg: error.detail };
            }
        });
    }
}
const data = new Data();
exports.default = data;
