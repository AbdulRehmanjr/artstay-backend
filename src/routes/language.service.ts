import { Router } from 'express';
import { 
    createLanguageService,
    updateLanguageService,
    deleteLanguageService,
    getLanguageServiceById,
    getAllLanguageServices,
    getLanguageServiceFilters,
    toggleLanguageServiceStatus
} from '~/controllers/language.controller';
import { validate } from '~/middlewares/zod.middleware';
import { 
    LanguageServiceCreationSchema, 
    LanguageServiceUpdateSchema 
} from '~/schemas/language';

const router = Router();

// GET routes
router.get('/all', getAllLanguageServices);
router.get('/filters', getLanguageServiceFilters);
router.get('/:languageServiceId', getLanguageServiceById);

// POST routes
router.post('/create', validate(LanguageServiceCreationSchema), createLanguageService);

// PUT routes
router.put('/toggle-status/:languageServiceId', toggleLanguageServiceStatus);

// PATCH routes
router.patch('/update/:languageServiceId', validate(LanguageServiceUpdateSchema), updateLanguageService);

// DELETE routes
router.delete('/delete/:languageServiceId', deleteLanguageService);

export const languageServiceRouter = router;