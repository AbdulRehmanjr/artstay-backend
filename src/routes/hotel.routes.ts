import { Router } from "express";
import { hotelApplicationtatus } from "~/controllers/hotel.controller";

const router = Router();

router.get("/application-status/:accountId", hotelApplicationtatus);


export const hotelRouter = router;
