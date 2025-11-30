import { Router } from 'express';
import { ProductsController } from '../controladores/products.controladores.js';


const router = Router();
const products_controller = new ProductsController();

router.get('/', products_controller.getAll);
router.get('/:id', products_controller.getOne);
router.post('/', products_controller.created);
router.put('/:id', products_controller.updated);
router.delete('/:id', products_controller.deleted);

export default router;

