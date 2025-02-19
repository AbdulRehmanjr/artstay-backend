import { Router } from 'express';
import { createArtisan, createSafari, updateArtisan, updateSafari } from '~/controllers/register.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanCreationSchema, artisanUpdationSchema, safariCreationSchema, safariUpdationSchema } from '~/schemas/register';


const router = Router();

router.post('/artisan', validate(artisanCreationSchema), createArtisan);
router.patch('/artisan', validate(artisanUpdationSchema), updateArtisan);

router.post('/safari', validate(safariCreationSchema), createSafari);
router.patch('/safari', validate(safariUpdationSchema), updateSafari);

export const registerRouter = router;