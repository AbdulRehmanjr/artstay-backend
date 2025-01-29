import { Router } from 'express';
import { createArtisan } from '~/controllers/artisan.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanCreationSchema } from '~/schemas/artisan';


const router = Router();

router.post('/create', validate(artisanCreationSchema),createArtisan);

export const artisanRouter = router;