import { Router } from 'express';
import { createArtisan, createFair, createSafari, createShop, createRestaurant,updateArtisan, updateFair, updateRestaurant, updateSafari, updateShop, updateTravelPlaner, createTravelPlaner } from '~/controllers/register.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanCreationSchema, artisanUpdationSchema, fairCreationSchema, fairUpdationSchema, restaurantCreationSchema, restaurantUpdationSchema, safariCreationSchema, safariUpdationSchema, shopCreationSchema, shopUpdationSchema, travelPlanerCreationSchema, travelPlanerUpdationSchema } from '~/schemas/register';

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
router.post('/shop', validate(shopCreationSchema), createShop);
router.patch('/shop', validate(shopUpdationSchema), updateShop);
//* dining
router.post('/dining', validate(restaurantCreationSchema), createRestaurant);
router.patch('/dining', validate(restaurantUpdationSchema), updateRestaurant);
//* travel
router.post('/travel', validate(travelPlanerCreationSchema), createTravelPlaner);
router.patch('/travel', validate(travelPlanerUpdationSchema), updateTravelPlaner);

export const registerRouter = router;