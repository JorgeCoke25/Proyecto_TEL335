import Router from 'koa-router'
import getHealth from './health/health'
const router = new Router()
import users from './user/user'
import verifyToken from "../middleware/verifyToken";

router.get('/health', getHealth);
//Obtener usuarios
router.get('/api/users', users.getUsers);
//Registrar usuario
router.post('/api/user/register', users.registerUser);
//Iniciar sesion de un usuario
router.post('/api/user/login', users.LoginUser);
//Obtener usuario por id
router.get('/api/user/:id', verifyToken , users.GetUser);



export default router
