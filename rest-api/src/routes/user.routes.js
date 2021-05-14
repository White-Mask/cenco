import {Router} from 'express';
const router = Router();

import {getUsers, updateUser, createUser, deleteUser}  from '../controllers/users.controller';

//Crear usuario
router.post('/', createUser);

//Obtener usuarios
router.get('/', getUsers);

//Actualizar usuario
router.put('/:id', updateUser);

//Eliminar usuario
router.delete('/:id', deleteUser);

/*Obtener usuario
router.get('/:id', getUser);
*/

export default router;