import { Router } from 'express';
import { updateTravelPlaner } from '~/controllers/register.controller';
import { createTravelTour, getAllTravelPlaners, getAllTravelPlanersPagination, getTravelTourById, getTravelTours, travelDetailByAccountId, updateTravelTour } from '~/controllers/travel.controller';
import { validate } from '~/middlewares/zod.middleware';
import { TravelTourCreationSchema, TravelTourUpdateSchema } from '~/schemas/travel';

const router = Router();

router.get('/detail/:accountId',travelDetailByAccountId)
router.post('/create-tour',validate(TravelTourCreationSchema),createTravelTour)
router.get('/tours/:accountId',getTravelTours)
router.get('/tour/:tourId',getTravelTourById)
router.get('/all',getAllTravelPlaners)
router.get('/pagination',getAllTravelPlanersPagination)

router.put('/toggle-status',updateTravelPlaner)
router.patch('/update-tour',validate(TravelTourUpdateSchema),updateTravelTour)

export const travelRouter = router;