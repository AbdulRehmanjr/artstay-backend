import { cancelBooking, createReservation, getAllBookingsWithDetailBySellerId, getAllReservations, getBookingWithDetailByBookingDetailId, getReservationForTable, getReservationPreview, refundBooking, suBooking, syncBooking, updatePayPalBooking, updateReservation } from "~/controllers/reservation.controller";
import { Router } from "express";


const router = Router();


router.get('/all/:sellerId', getAllBookingsWithDetailBySellerId)
router.get("/:sellerId", getAllReservations)
router.get('/preview/:sellerId', getReservationPreview)
router.get('/seller-all/:sellerId', getReservationForTable)

router.post("/",suBooking)
router.post('/detail', getBookingWithDetailByBookingDetailId)
router.patch('/paypal', updatePayPalBooking)
router.post('/create', createReservation)
router.patch('/', updateReservation)
router.post('/cancel', cancelBooking)
router.post('/refund', refundBooking)
router.post('/sync', syncBooking)

export const reservationRouter = router;
