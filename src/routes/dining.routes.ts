import { Router } from 'express';
import { createMenuItem, getAllRestaurantsPagination, getMenuItemsByRestaurant, restaurantDetailByAccountId, restaurantDetailByRestaurantId, updateMenuItem } from '~/controllers/dining.controller';
import { validate } from '~/middlewares/zod.middleware';
import { createMenuItemSchema, updateMenuItemSchema } from '~/schemas/dining';

const router = Router();

router.get('/all', getAllRestaurantsPagination) 
router.get('/:accountId', restaurantDetailByAccountId)
router.get('/detail/:restaurantId', restaurantDetailByRestaurantId)
router.get('/menu/:accountId', getMenuItemsByRestaurant)
router.post('/menu', validate(createMenuItemSchema), createMenuItem)
router.patch('/menu/:menuItemId', validate(updateMenuItemSchema), updateMenuItem)

export const diningRouter = router;