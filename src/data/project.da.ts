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

    async Show (id:number){

        const ssql =    `select ps.id, ps.projectid, ps.shieldid,ps.descripcion,
                                p.nombre proynombre,
                                p.descripcion proydesc,
                                sf.tpshield as tpshield,
                                sf.shield as shield,
                                sf.imagen,
                                sf.pines
                                
                        from projectshield ps
                        inner join projects p on ps.projectid = p.id
                        inner join  
                            (	select s.id, s.tiposhieldid, ts.nombre tpshield,s.nombre shield, imagen, pines, s.active
                                from shields s
                                inner join tiposhields ts on ts.id = s.tiposhieldid 
                            ) sf
                            on ps.shieldid = sf.id
                        where
                            ps.projectid = $1`

            const {rows} = await db.query(ssql, [id])
            return rows  
    }

    async Update (project:IProject){

        const ssql = "update projects set " +
                        "nombre=$1, "+
                        "descripcion=$2, "+
                        "updated=$3 "+
                    "where userid=$4 and id=$5;"

        const values = [
            project.nombre,
            project.descripcion,
            project.updated,
            project.userid,
            project.id
        ]
        console.log(values)
        
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
