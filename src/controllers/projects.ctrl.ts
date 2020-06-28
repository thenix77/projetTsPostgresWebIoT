import {Request, Response} from 'express'
import da from '../data/project.da'
import {IProject} from '../models/project.model'

class Ctrl {
    async Index (req:Request, res:Response):Promise<Response|void> {

        const rst = await da.Listar(req.userId)
        return res.status(200).json(rst)           
    }

    async Create (req:Request, res:Response):Promise<Response|void> {

        const project:IProject = req.body
        project.userid = req.userId

        const rst = await da.Insert(project)
        return res.status(200).json(rst)           
    }

    async Show (req:Request, res:Response):Promise<Response|void> {
        const id:number = parseInt(req.params.id)
        const  userid = req.userId
        
        const rst = await da.Show(id,userid)
        return res.status(200).json(rst)           
    }

    async Update (req:Request, res:Response):Promise<Response|void> {
       const project:IProject = req.body
       project.userid = req.userId
       project.updated = new Date(Date.now())

        const rst = await da.Update(project)
        return res.status(200).json(rst)           
    }

    async Active (req:Request, res:Response):Promise<Response|void> {
        
        const userid = req.userId
        const id:number = parseInt(req.params.id)
 
         const rst = await da.Active(userid,id)
         return res.status(200).json(rst)           
     }

}

const ctrl = new Ctrl()
export default ctrl