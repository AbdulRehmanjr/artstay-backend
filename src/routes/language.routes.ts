import { Router } from 'express';
import { 
    getLanguageServiceById,
    getAllLanguageServices,
    getLanguageServiceFilters,
    toggleLanguageServiceStatus,
    languageApplicationStatus
} from '~/controllers/language.controller';


const router = Router();

// GET routes
router.get('/all', getAllLanguageServices);
router.get('/filters', getLanguageServiceFilters);
router.get('/application-status/:accountId',languageApplicationStatus)
router.get('/:languageServiceId', getLanguageServiceById);

// PUT routes
router.put('/toggle-status/:languageServiceId', toggleLanguageServiceStatus);

export const languageRouter = router;