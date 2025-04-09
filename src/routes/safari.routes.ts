import { Router } from 'express';
import { allSafaris, createSafariTour, getApplicationStatus, getSafariTours, getTourById, safariDetailByAccountId, safariDetailById } from '~/controllers/safari.controller';
import { validate } from '~/middlewares/zod.middleware';
import { SafariTourSchema } from '~/schemas/safari';

const router = Router();

router.get('/detail/:accountId', safariDetailByAccountId)
router.get('/tours/:accountId',getSafariTours)
router.get('/tour/:tourId',getTourById)
router.get('/all', allSafaris)
router.get('/:safariId', safariDetailById)
router.get('/application-status/:accountId', getApplicationStatus)
router.post('/tour',validate(SafariTourSchema), createSafariTour)

export const safariRouter = router;