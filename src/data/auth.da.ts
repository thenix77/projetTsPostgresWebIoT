import db from "../database/conexion";
import {
  IUser,
  ICredential,
  PasswordHash,
  ValidatePassword,
} from "../models/users.model";
import { QueryResult } from "pg";
import { token as tk } from "../lib/token";

import { io } from "../app";

class DataAcess {
  async listar() {
    const ssql = "select * from users";
    const { rows } = await db.query(ssql);

    return rows;
  }

  async Register(user: IUser) {
    const values = [
      user.nombre,
      user.apellidop,
      user.apellidom,
      user.dni,
      user.email,
      await PasswordHash(user.password),
      user.rolid,
    ];

    const ssql =
      "insert into users(nombre,apellidop,apellidom,dni,email,password,rolid) " +
      "values($1,$2,$3,$4,$5,$6,$7);";

    try {
      const { rowCount } = await db.query(ssql, values);

      return { insert: true, msg: "se creo el registro" };
    } catch (error) {
      return { insert: false, msg: error.detail };
    }
  }

  async SignIn(login: ICredential) {
    let validate: boolean = false;
    let user :IUser 

    const ssql = "select * from users where active=true and dni like $1 ";
    
    try {
      const { rows }: QueryResult = await db.query(ssql, [login.dni]);
      user = rows[0] ;

      if(user.login)
       return { token: null, msg: "usuario ya validado...!" };


      if (user) {
        validate = await ValidatePassword(login.password, user.password);

        if (await ValidatePassword(login.password, user.password)) {
          const upssql =
            "update users set logindate=now(),login=true where id=$1";
          await db.query(upssql, [user.id]);

          return { token: await tk(user.id || 0),auth:true, msg: "autorizado" };
        } else {
          return { token: null, auth:false, msg: "credencial no valida" };
        }
      }
      return { token: "", msg: "usuario no valido" };

    } catch (error) {
      return { token: "", msg: "usuario no valido" };
    }
   
  }

  async Logout(userid: number) {
    const ssql = "update users set login=false where id=$1";
    await db.query(ssql, [userid]);

    console.log(`userid: ${userid}`)

    return { logout: true, msg: "logout" };
  }
}

const da = new DataAcess();
export default da;
