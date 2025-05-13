import { Router } from 'express';
import { createMenuItem, diningApplicationStatus, getAllRestaurants, getAllRestaurantsFilters, getAllRestaurantsPagination, getMenuItemsByRestaurant, restaurantDetailByAccountId, restaurantDetailByRestaurantId, updateMenuItem } from '~/controllers/dining.controller';
import { validate } from '~/middlewares/zod.middleware';
import { createMenuItemSchema, updateMenuItemSchema } from '~/schemas/dining';

const router = Router();

router.get('/all',getAllRestaurants)
router.get('/pagination', getAllRestaurantsPagination) 
router.get('/filters',getAllRestaurantsFilters)
router.get("/application-status/:accountId", diningApplicationStatus);
router.get('/detail/:restaurantId', restaurantDetailByRestaurantId)
router.get('/menu/:accountId', getMenuItemsByRestaurant)
router.get('/:accountId', restaurantDetailByAccountId)

router.post('/menu', validate(createMenuItemSchema), createMenuItem)
router.patch('/menu/:menuItemId', validate(updateMenuItemSchema), updateMenuItem)

export const diningRouter = router;