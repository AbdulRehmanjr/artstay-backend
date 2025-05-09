import { Router } from 'express';
import { createHotel, getAllRoomsByHotelId, getHotelByAccountId, updateHotel } from '~/controllers/property.controller';
import { validate } from '~/middlewares/zod.middleware';
import { PropertyCreationSchema, PropertyUpdateSchema } from '~/schemas/hotel';


const router = Router();

router.get('/:accountId',getHotelByAccountId)
router.post('/',validate(PropertyCreationSchema),createHotel)
router.put('/',validate(PropertyUpdateSchema),updateHotel)

router.get('/:accountId/rooms',getAllRoomsByHotelId)
export const propertyRouter = router;