import { Router } from 'express';
import controller from './user.controller';

const router = new Router();

router.get('/api/users', controller.findAll);
router.get('/api/users/:id', controller.findById);
router.put('/api/users/:id', controller.update);
router.delete('/api/users/:id', controller.delete);

module.exports = router;
