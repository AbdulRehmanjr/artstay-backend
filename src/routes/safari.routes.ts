import { Router } from 'express';
import {  createSafariTour, getAllSafaris, getAllSafarisPagination, getApplicationStatus, getSafariTours, getTourById, safariDetailByAccountId, safariDetailById, updateSafariStatus } from '~/controllers/safari.controller';
import { validate } from '~/middlewares/zod.middleware';
import { SafariTourSchema } from '~/schemas/safari';

const router = Router();

router.get('/detail/:accountId', safariDetailByAccountId)
router.get('/tours/:accountId',getSafariTours)
router.get('/tour/:tourId',getTourById)
router.get('/pagination', getAllSafarisPagination)
router.get('/all', getAllSafaris)
router.get('/:safariId', safariDetailById)
router.get('/application-status/:accountId', getApplicationStatus)

router.post('/tour',validate(SafariTourSchema), createSafariTour)
router.put('/toggle-status', updateSafariStatus)

export const safariRouter = router;