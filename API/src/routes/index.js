import Router from 'koa-router'
import getHealth from './health/health'
const router = new Router()
import users from './user/user'

router.get('/health', getHealth);
//Obtener usuarios
router.get('/api/users', users.getUsers);
//Registrar usuario
router.post('/api/users', users.registerUser);


export default router
