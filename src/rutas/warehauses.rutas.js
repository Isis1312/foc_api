
import { Router } from 'express';
import { WarehausesController } from '../controladores/warehauses.controladores.js';


const router = Router();
const warehause_controller= new WarehausesController()
//obtener una lista
router.get('/', warehause_controller.getAll)
//obtener uno
router.get('/:id',warehause_controller.getOne)
//post
router.post('/', warehause_controller.created)
//put
router.put('/:id',warehause_controller.updated)
//delete
router.delete('/:id',warehause_controller.deleted)
export default router;