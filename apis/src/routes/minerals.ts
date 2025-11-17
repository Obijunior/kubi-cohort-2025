import { Router } from 'express';
import * as mineralController from '../controllers/mineralController';

const router = Router();

// GET all minerals
router.get('/', mineralController.getAllMinerals);

// GET specific mineral data
router.get('/:mineralName', mineralController.getMineralData);

export default router;
