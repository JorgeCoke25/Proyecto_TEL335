import Router from 'koa-router'
import getHealth from './health/health'
const router = new Router()
import users from './user/user'
import movement from './movement/movement'
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
//Actualizar foto de perfil
router.put('/api/user/picture/:id', verifyToken, users.PutPicture)
//Actualizar nombre de usuario
router.put('/api/user/name/:id',verifyToken, users.PutName)


//Registrar movimiento a un usuario
router.post('/api/movement/user/:id_user', verifyToken, movement.PostMovement)
//Obtener movimiento por ID
router.get('/api/movement/:id', verifyToken, movement.GetMovement)
//Borrar movimiento de un usuario
router.del('/api/movement/:id/user/:id_user', verifyToken, movement.DeleteMovement)
//Obtener movimientos de un usuario
router.get('/api/movements/:id', verifyToken, movement.GetMovements)
//Editar movimineto por id
router.put('/api/movement/:id', verifyToken, movement.UpdateMovement)







export default router
