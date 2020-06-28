import db from '../database/conexion'
import { IProject, IProjectId} from '../models/project.model'

class Data {
    async Listar(userid:number){

        const ssql = 'select * from projects where userid=$1 order by active desc,created desc'
        const {rows} = await db.query(ssql, [userid])


        return rows
    }

    async Insert (project:IProject){

        const ssql = 'insert into projects(nombre,descripcion,userid) '+
                     'values ($1,$2,$3)  RETURNING id'

        try {
            let {rows} = await db.query(ssql, [project.nombre,project.descripcion,project.userid])
            return ({insert:true,msg:'registro correcto',id:rows[0].id})    
        } catch (error) {
            return ({insert:false, msg:error.detail,id:0})
        }

    }

    async Show (id:number,userid:number){

        const ssql = 'select * from projects '+
                     'where id=$1 and userid=$2'

            const {rows} = await db.query(ssql, [id,userid])
            return rows    
    }

    async Update (project:IProject){

        const ssql = "update projects set " +
                    "nombre=$1, "+
                    "descripcion=$2, "+
                    "active=$3, "+
                    "updated=$4 "+
                    "where userid=$5 and id=$6;"

        const values = [
            project.nombre,
            project.descripcion,
            project.active,
            project.updated,
            project.userid,
            project.id
            
        ]
        
        try {
            await db.query(ssql,values)

            return ({update:true,msg:'registro actualizado'})    
        } catch (error) {
            return ({update:false,msg:error.detail})
        }
        
    }

    async Active(userdId:number, id:number){
        const ssql= `update projects
                        set
                            active=  (select (not active) from projects where id=$1)
                    where 
                        id=$1 and userid=$2;`
        try {
            await db.query(ssql,[id,userdId])
            return {active:true,msg:'registro actualizado'}
        } catch (error) {
            return {active:true,msg:error.detail}
        }

    }
}

const data =new  Data()
export default data
