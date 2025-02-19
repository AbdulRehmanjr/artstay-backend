import { Router } from 'express';
import { createSafariTour, getSafariTours, getTourById, safariDetailByAccountId } from '~/controllers/safari.controller';
import { validate } from '~/middlewares/zod.middleware';
import { SafariTourSchema } from '~/schemas/safari';

const router = Router();

router.get('/detail/:accountId', safariDetailByAccountId)
router.get('/tours/:accountId',getSafariTours)
router.get('/tour/:tourId',getTourById)
router.post('/create-tour',validate(SafariTourSchema), createSafariTour)

export const safariRouter = router;