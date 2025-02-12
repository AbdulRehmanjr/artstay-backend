import { Router } from 'express';
import { createArtisanPackage } from '~/controllers/package.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanPackageCreationSchema } from '~/schemas/package';

const router = Router();

router.post('/create/artisan',validate(artisanPackageCreationSchema),createArtisanPackage)

export const packageRouter = router;