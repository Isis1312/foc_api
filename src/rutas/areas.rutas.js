import { Router } from 'express';
import { AreaController } from '../controladores/areas.controladores.js';


const router = Router();
const area_controller = new AreaController();

router.get('/', area_controller.getAll);

router.get('/:id', area_controller.getOne);

router.post('/', area_controller.created);

router.put('/:id', area_controller.updated);

router.delete('/:id', area_controller.deleted);

export default router;
