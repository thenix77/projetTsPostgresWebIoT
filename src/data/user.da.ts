import db from '../database/conexion'
import { IProject} from '../models/project.model'

class Data {
    async Listar(userid:number){
        const ssql =    'select concat(u.apellidop,\', \',u.nombre) usuario, email,active,login,logindate,photo,r.id,r.nombre rol '+
                        'from users u '+
                        'inner join rols r on r.id = u.rolid '+
                        'where '+
                        '   active=true '+
                        'order by login desc,logindate desc '+
                        'limit 10'
        const {rows} = await db.query(ssql)
       
        return {auth:true ,users:rows}
    }

   async Show (userid:number){

        const ssql = 'select * from users '+
                     'where id=$1'

            const {rows} = await db.query(ssql, [userid])
            return rows[0]    
    }

}

const data =new  Data()
export default data