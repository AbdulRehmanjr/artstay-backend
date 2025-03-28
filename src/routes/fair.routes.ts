import { Router } from 'express';
import { allFairEvents, createFairEvent, fairDetailById, fairProfileByAccountId, getEventById, getFairEvents } from '~/controllers/fair.controller';
import { validate } from '~/middlewares/zod.middleware';
import { FairEventSchema, UpdateFairEventSchema } from '~/schemas/fair';

const router = Router();

router.get('/detail/:accountId', fairProfileByAccountId)
router.get('/events/:accountId', getFairEvents)
router.get('/event/:eventId', getEventById)
router.get('/all', allFairEvents)
router.get('/:fairId', fairDetailById)

router.post('/event', validate(FairEventSchema), createFairEvent)
router.patch('/event', validate(UpdateFairEventSchema), createFairEvent)

export const fairRouter = router;