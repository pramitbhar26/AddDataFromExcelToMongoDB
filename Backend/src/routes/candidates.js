import { Router } from 'express';
const router = Router();
import { uploadCandidates } from '../controllers/candidateController.js';

// Define routes
router.post('/upload', uploadCandidates);

export default router;
