import { Router } from 'express';
import { createArtisan, createFair, createSafari, updateArtisan, updateFair, updateSafari } from '~/controllers/register.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanCreationSchema, artisanUpdationSchema, fairCreationSchema, fairUpdationSchema, safariCreationSchema, safariUpdationSchema, shopCreationSchema, shopUpdationSchema } from '~/schemas/register';


const router = Router();

//* artisan
router.post('/artisan', validate(artisanCreationSchema), createArtisan);
router.patch('/artisan', validate(artisanUpdationSchema), updateArtisan);
//* safair
router.post('/safari', validate(safariCreationSchema), createSafari);
router.patch('/safari', validate(safariUpdationSchema), updateSafari);
//* fair
router.post('/fair', validate(fairCreationSchema), createFair);
router.patch('/fair', validate(fairUpdationSchema), updateFair);
//* shop
// router.post('/shop', validate(shopCreationSchema), createShop);
// router.patch('/shop', validate(shopUpdationSchema), updateShop);

export const registerRouter = router;