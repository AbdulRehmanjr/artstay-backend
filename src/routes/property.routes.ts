import { Router } from "express";
import {
  createRoom,
  getAllRoomsByAccountId,
  getHotelByAccountId,
  hotelApplicationtatus,
  updateHotel,
  updateRoomStatus,
} from "~/controllers/property.controller";
import { validate } from "~/middlewares/zod.middleware";
import { PropertyUpdateSchema } from "~/schemas/hotel";

const router = Router();

router.get("/application-status/:accountId", hotelApplicationtatus);
router.get("/rooms/:accountId", getAllRoomsByAccountId);
router.get("/hotels/:accountId", getHotelByAccountId);

router.post('/create-room',createRoom)
router.put('/room-status',updateRoomStatus)
router.put("/", validate(PropertyUpdateSchema), updateHotel);

export const propertyRouter = router;