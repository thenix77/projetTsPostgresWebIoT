import {Request, Response} from 'express'
import da from '../../data/auth.da'
import { IUser, ICredential } from '../../models/users.model'

class Ctrl {
    async Index (req:Request, res:Response):Promise<Response|void> {
        const users = await da.listar()
        return res.status(200).json(users)           
    }

    async Register (req:Request, res:Response):Promise<Response|void> {
        const user:IUser = req.body
        let rst = await da.Register(user)
        
        
        return res.status(200).json({rst})           
    }

    async SignIn (req:Request, res:Response):Promise<Response|void> {
        const login:ICredential = req.body
        console.log(login)
        const rst = await da.SignIn(login)
        
        return res.status(200).header({'token':rst.token}).json(rst)    
    }

    async Logout (req:Request, res:Response):Promise<Response|void> {
        
        const rst = await da.Logout(req.userId)
        
        return res.status(200).json(rst)    
    }

    async Verifica (req:Request, res:Response):Promise<Response|void> {
        
        return res.status(200).json({auth:true, msg:'authorizado'})    
    }  
}

const ctrl = new Ctrl()
export default ctrl