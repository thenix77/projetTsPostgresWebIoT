import {Request, Response} from 'express'
import da from '../data/user.da'

class Ctrl {
    async Index (req:Request, res:Response):Promise<Response|void> {
        
        const rst = await da.Listar(req.userId)
        return res.status(200).json(rst)           
    }

    async Show (req:Request, res:Response):Promise<Response|void> {
        const  userid = req.userId
        
        const rst = await da.Show(userid)
        return res.status(200).json(rst)           
    }

    async Create (req:Request, res:Response):Promise<Response|void> {

          
    }

    async Update (req:Request, res:Response):Promise<Response|void> {
            
    }

}

const ctrl = new Ctrl()
export default ctrl