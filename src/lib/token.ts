import { Request,Response,NextFunction } from 'express'
import {IPayload} from '../models/payload.model'
import jwt from 'jwt-then'

const apiToken:string = 'La$$ZDXe|f8F7Uf[F2J4Se]2</{916eds+d>*M=8)fOcc)NTF3jlJADcjow.dQ?'

export async function token(id:number):Promise<String>{

    let token:string = ''

    if(id > 0){
        token = await jwt.sign({id:id}, apiToken)
    }

    return token
}

export const validationToken = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    const token= req.header('token')

    if(!token) return res.status(200).json({auth:false,msg:'no autorizado'})

    try {
        const payload = (await jwt.verify(
          token,
          apiToken || "testToken"
        )) as IPayload;
    
        req.userId = payload.id;
      } catch (error) {
        return res.status(200).json({ auth:false,acceso: "No Autorizado" });
      }


    next()
}
