import { Router } from 'express';
import * as controller from '../controllers/product.controller.js';

const router = Router();

router.route('/').get(controller.list).post(controller.create);
router.route('/:id').get(controller.getOne).put(controller.update).delete(controller.remove);

export default router;
