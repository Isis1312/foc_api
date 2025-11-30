import { Router } from 'express';
import { ProductsController } from '../controladores/products.controladores.js';
import { 
  createProductValidator, 
  updateProductValidator, 
  getProductByIdValidator, 
  deleteProductValidator 
} from '../validators/products.validator.js';

const router = Router();
const products_controller = new ProductsController();

router.get('/', products_controller.getAll);
router.get('/:id', getProductByIdValidator, products_controller.getOne);
router.post('/', createProductValidator, products_controller.created);
router.put('/:id', updateProductValidator, products_controller.updated);
router.delete('/:id', deleteProductValidator, products_controller.deleted);

export default router;