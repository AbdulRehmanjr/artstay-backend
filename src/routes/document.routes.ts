import { Router } from 'express';
import { craftDocumentorApplicationStatus, createCraftDocumentorProfile } from '~/controllers/document.controller';


const router = Router();

router.get('/application-status/:accountId', craftDocumentorApplicationStatus);
router.post('/create-profile', createCraftDocumentorProfile);

export const craftDocumentorRouter = router;