import { Router } from 'express';
import { allArtisans, artisanDetailByAccountId, artisanDetailByArtisanId, createArtisan, updateArtisan } from '~/controllers/artisan.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanCreationSchema, artisanUpdationSchema } from '~/schemas/artisan';


const router = Router();

router.get('/all',allArtisans)
router.get('/:artisanId',artisanDetailByArtisanId)
router.get('/detail/:accountId',artisanDetailByAccountId)
router.post('/create', validate(artisanCreationSchema),createArtisan);
router.patch('/update', validate(artisanUpdationSchema),updateArtisan);

export const artisanRouter = router;