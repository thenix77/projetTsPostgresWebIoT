import {Router} from 'express'
import ctrl from '../../controllers/auth/auth.ctrl'
import {validationToken} from '../../lib/token'

class Rutas{

    router:Router
    constructor(){
        this.router = Router()
        this.routeGet()
        this.routePost()
    }

    routeGet(){
        this.router.get('/',validationToken, ctrl.Index)
        this.router.get('/logout',validationToken, ctrl.Logout)
        this.router.get('/verified', validationToken , ctrl.Verifica)
    }

    routePost(){
        this.router.post('/register', ctrl.Register)
        this.router.post('/signin', ctrl.SignIn)
    }
}

const rutas =  new Rutas()
export default rutas.router