import {Router} from 'express'
import ctrl from '../controllers/default.ctrl'

class Rutas{

    router:Router
    constructor(){
        this.router = Router()
        this.routeGet()
        this.routePost()
    }

    routeGet(){
        this.router.get('/', ctrl.index)
    }

    routePost(){

    }
}

const rutas =  new Rutas()
export default rutas.router