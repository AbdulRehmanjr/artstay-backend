import { Router } from 'express';
import { artisanDetailByAccountId, createArtisan, updateArtisan } from '~/controllers/artisan.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanCreationSchema, artisanUpdationSchema } from '~/schemas/artisan';


const router = Router();

router.get('/detail/:accountId',artisanDetailByAccountId)
router.post('/create', validate(artisanCreationSchema),createArtisan);
router.patch('/update', validate(artisanUpdationSchema),updateArtisan);

export const artisanRouter = router;