
import { Router } from 'express';
import { CategoriesController } from '../controladores/categories.controladores.js';


const router = Router();
const categories_controller= new CategoriesController()
//obtener una lista
router.get('/', categories_controller.getAll)
//obtener uno
router.get('/:id',categories_controller.getOne)
//post
router.post('/', categories_controller.created)
//put
router.put('/:id',categories_controller.updated)
//delete
router.delete('/:id',categories_controller.deleted)
export default router;