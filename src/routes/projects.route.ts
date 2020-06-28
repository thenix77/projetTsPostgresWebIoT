import {Router} from 'express'
import ctrl from '../controllers/projects.ctrl'

import {validationToken} from '../lib/token'

class Rutas{

    router:Router
    constructor(){
        this.router = Router()
        this.routeGet()
        this.routePost()
    }

    routeGet(){
        this.router.get('/',validationToken, ctrl.Index)
        this.router.get('/show/:id', validationToken,ctrl.Show)
        this.router.get('/active/:id' , validationToken ,ctrl.Active)
    }

    routePost(){
        this.router.post('/create', validationToken, ctrl.Create)
        this.router.post('/update', validationToken , ctrl.Update)
    }
}

const rutas =  new Rutas()
export default rutas.router