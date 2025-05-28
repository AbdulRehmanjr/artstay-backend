import dayjs from "dayjs";
import { Request } from "express";
import isBetween from "dayjs/plugin/isBetween";
import { NotFoundError, AppError } from "@/utils/errors";
import prisma from "~/libs/prisma";

dayjs.extend(isBetween);

export const mealPlanTypes = [
  { code: 1, name: "All inclusive" },
  { code: 2, name: "BreakFast" },
  { code: 3, name: "Lunch" },
  { code: 4, name: "Dinner" },
  { code: 5, name: "American" },
  { code: 6, name: "Bed & breakfast" },
  { code: 7, name: "Buffet breakfast" },
  { code: 8, name: "Caribbean breakfast" },
  { code: 9, name: "Continental breakfast" },
  { code: 10, name: "English breakfast" },
  { code: 11, name: "European plan" },
  { code: 12, name: "Family plan" },
  { code: 13, name: "Full board" },
  { code: 14, name: "Half board" },
  { code: 15, name: "Room only (Default)" },
  { code: 16, name: "Self catering" },
  { code: 17, name: "Bermuda" },
  { code: 18, name: "Dinner bed and breakfast plan" },
  { code: 19, name: "Family American" },
  { code: 20, name: "Modified" },
  { code: 21, name: "Breakfast & lunch" },
];




const getBookingsForDate = async (date: string, sellerId: string) => {
  return prisma.roomBooking.findMany({
    where: {
      room: {
        hotel: {
          accountId: sellerId,
        },
      },
      OR: [
        { startDate: date },
        { endDate: dayjs(date).subtract(1, "day").format("YYYY-MM-DD") },
      ],
    },
    select: {
      bookingId: true,
      startDate: true,
      endDate: true,
      price: true,
      adults: true,
      children: true,
      room: {
        select: {
          name: true,
          roomType: true,
          hotel: {
            select: {
              name: true,
            },
          },
        },
      },
      BookingDetail: {
        select: {
          bookingDetailId: true,
          email: true,
          firstName: true,
          country: true,
        },
      },
    },
  });
};

export const reservationService = {
  reservationPreview: async (sellerId: string) => {
    try {
      const today = dayjs().format("YYYY-MM-DD");
      const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

      const [todayBookings, tomorrowBookings]: [
        BookingPreviewProps[],
        BookingPreviewProps[]
      ] = await Promise.all([
        getBookingsForDate(today, sellerId),
        getBookingsForDate(tomorrow, sellerId),
      ]);

      return {
        status: "success",
        message: "Bookings fetched successfully",
        data: {
          todayBookings,
          tomorrowBookings,
        },
      };
    } catch (error) {
      logger.error("Error fetching reservation preview", {
        error: error instanceof Error ? error.message : "Unknown error",
        sellerId,
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  getAllReservations: async (sellerId: string) => {
    try {
      const bookings: ReservationProps[] = await prisma.roomBooking.findMany({
        where: {
          Room: {
            Hotel: {
              accountId: sellerId,
            },
          },
          BookingDetail: {
            status: {
              not: "cancelled",
            },
          },
        },
        select: {
          bookingId: true,
          roomId: true,
          type: true,
          startDate: true,
          endDate: true,
          adults: true,
          children: true,
          quantity: true,
          BookingDetail: {
            select: {
              bookingDetailId: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
      });

      return {
        status: "success",
        message: "Bookings fetched successfully",
        data: bookings,
      };
    } catch (error) {
      logger.error("Error fetching all reservations", {
        error: error instanceof Error ? error.message : "Unknown error",
        sellerId,
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  getBookingWithDetailByBookingDetailId: async (
    bookingId: string,
    accountId: string
  ) => {
    try {
      const booking: BookingDetailProps | null =
        await prisma.bookingDetail.findUnique({
          where: { bookingDetailId: bookingId },
          select: {
            bookingDetailId: true,
            city: true,
            country: true,
            phone: true,
            zip: true,
            address: true,
            firstName: true,
            lastName: true,
            email: true,
            arrivalTime: true,
            status: true,
            additionalInfo: true,
            dob: true,
            bookingReservationId: true,
            RoomBookings: {
              where: {
                Room: {
                  Hotel: {
                    accountId: accountId,
                  },
                },
              },
              select: {
                bookingId: true,
                startDate: true,
                endDate: true,
                price: true,
                isRefund: true,
                payPalBookingId: true,
                roomId: true,
                bookingDetailId: true,
                type: true,
                mealType: true,
                quantity: true,
                adults: true,
                children: true,
                infants: true,
                ratePlan: true,
                extras: true,
                createdAt: true,
                Room: {
                  select: {
                    roomId: true,
                    roomName: true,
                    hotelId: true,
                    roomType: true,
                    Hotel: {
                      select: {
                        hotelName: true,
                        island: true,
                        phone: true,
                        hotelLogo: true,
                      },
                    },
                  },
                },
                PayPalBooking: true,
              },
            },
          },
        });

      if (!booking) throw new Error("Booking not found with given id");

      return {
        status: "success",
        message: "Booking fetched successfully",
        data: booking,
      };
    } catch (error) {
      logger.error("Error fetching booking detail", {
        error: error instanceof Error ? error.message : "Unknown error",
        bookingId,
        accountId,
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  getReservationTable: async (accountId: string) => {
    try {
      const bookings: BookingTableProps[] = await prisma.roomBooking.findMany({
        where: {
          Room: {
            Hotel: {
              accountId: accountId,
            },
          },
        },
        select: {
          bookingId: true,
          startDate: true,
          endDate: true,
          price: true,
          isRefund: true,
          payPalBookingId: true,
          bookingDetailId: true,
          type: true,
          mealType: true,
          createdAt: true,
          adults: true,
          children: true,
          infants: true,
          Room: {
            select: {
              roomId: true,
              roomName: true,
            },
          },
          BookingDetail: {
            select: {
              bookingDetailId: true,
              firstName: true,
              lastName: true,
              email: true,
              status: true,
              bookingReservationId: true,
            },
          },
          PayPalBooking: {
            select: { paymentId: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: "success",
        message: "Bookings fetched successfully",
        data: bookings,
      };
    } catch (error) {
      logger.error("Error fetching reservation table", {
        error: error instanceof Error ? error.message : "Unknown error",
        accountId,
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  getAllBookingsWithDetail: async (sellerId: string) => {
    try {
      const bookings: RoomBookingDetailProps[] =
        await prisma.roomBooking.findMany({
          where: {
            Room: {
              Hotel: {
                accountId: sellerId,
              },
            },
          },
          select: {
            bookingId: true,
            startDate: true,
            endDate: true,
            price: true,
            isRefund: true,
            payPalBookingId: true,
            roomId: true,
            bookingDetailId: true,
            type: true,
            mealType: true,
            quantity: true,
            adults: true,
            children: true,
            infants: true,
            createdAt: true,
            BookingDetail: {
              select: {
                bookingDetailId: true,
                city: true,
                country: true,
                phone: true,
                zip: true,
                address: true,
                firstName: true,
                lastName: true,
                email: true,
                arrivalTime: true,
                status: true,
                additionalInfo: true,
              },
            },
            Room: {
              select: {
                roomId: true,
                roomName: true,
                hotelId: true,
                roomType: true,
                Hotel: {
                  select: {
                    hotelName: true,
                    island: true,
                    phone: true,
                    hotelLogo: true,
                  },
                },
              },
            },
            PayPalBooking: {
              select: {
                paypalBookingId: true,
                paymentId: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

      return {
        status: "success",
        message: "Bookings fetched successfully",
        data: bookings,
      };
    } catch (error) {
      logger.error("Error fetching bookings with detail", {
        error: error instanceof Error ? error.message : "Unknown error",
        sellerId,
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  makeBooking: async (req: Request) => {
    try {
      const input: BookingCreationProps = req.body;
      
      const room = await prisma.room.findUnique({
        where: { roomId: input.roomId },
        select: {
          hotelId: true,
          code: true,
          quantity: true,
          Hotel: {
            select: {
              code: true,
            },
          },
        },
      });
      
      if (!room) throw new NotFoundError("Room not found");

      const rate = await prisma.roomRatePlan.findUnique({
        where: { rrpId: input.rateplan },
        include: {
          Rate: {
            select: {
              code: true,
            },
          },
        },
      });

      if (!rate) throw new NotFoundError("Rate plan not found");

      const bookingInfo: BookingInfoProps = await prisma.bookingDetail.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          country: input.country,
          city: input.city,
          arrivalTime: input.arrivalTime,
          zip: input.zip,
          address: input.address,
          additionalInfo: input.additional,
          dob:
            input.dob !== "none"
              ? dayjs(input.dob).format("YYYY-MM-DD")
              : "none",
        },
      });

      await prisma.roomBooking.create({
        data: {
          adults: input.adults,
          children: input.children,
          infants: input.infants,
          startDate: input.startDate,
          endDate: input.endDate,
          price: input.price,
          ratePlan: rate.Rate.code,
          type: input.type,
          quantity: input.quantity,
          mealType: input.mealType,
          roomId: input.roomId,
          bookingDetailId: bookingInfo.bookingDetailId,
        },
      });

      logger.info("Booking created successfully", {
        logType: "Booking creation",
        bookingDetailId: bookingInfo.bookingDetailId,
        roomId: input.roomId,
        startDate: input.startDate,
        endDate: input.endDate,
      });

      return {
        status: "success",
        message: "Booking created successfully",
        data: null,
      };
    } catch (error) {
      logger.error("Booking creation failed", {
        logType: "Booking creation error",
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Failed to create booking");
    }
  },

  updateBooking: async (req: Request) => {
    try {
      const input: BookingUpdateProps = req.body;
      
      const room = await prisma.room.findUnique({
        where: { roomId: input.roomId },
        select: {
          hotelId: true,
          code: true,
          quantity: true,
          Hotel: {
            select: {
              code: true,
            },
          },
        },
      });
      
      if (!room) throw new NotFoundError("Room not found");

      const rate = await prisma.roomRatePlan.findUnique({
        where: { rrpId: input.rateplan },
        include: {
          Rate: {
            select: {
              code: true,
            },
          },
        },
      });
      
      if (!rate) throw new NotFoundError("Rate plan not found");

      const bookingInfo: BookingInfoProps = await prisma.bookingDetail.update({
        where: { bookingDetailId: input.bookingDetailId },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          country: input.country,
          city: input.city,
          arrivalTime: input.arrivalTime,
          zip: input.zip,
          address: input.address,
          additionalInfo: input.additional,
          status: "modified",
          dob:
            input.dob !== "none"
              ? dayjs(input.dob).format("YYYY-MM-DD")
              : "none",
        },
      });

      await prisma.roomBooking.update({
        where: { bookingId: input.bookingId },
        data: {
          adults: input.adults,
          children: input.children,
          infants: input.infants,
          startDate: input.startDate,
          endDate: input.endDate,
          price: input.price,
          ratePlan: rate.Rate.code,
          type: input.type,
          quantity: input.quantity,
          mealType: input.mealType,
          roomId: input.roomId,
          bookingDetailId: bookingInfo.bookingDetailId,
        },
      });

      logger.info("Booking updated successfully", {
        logType: "Booking update",
        bookingId: input.bookingId,
        bookingDetailId: input.bookingDetailId,
      });

      return {
        status: "success",
        message: "Booking updated successfully",
        data: null,
      };
    } catch (error) {
      logger.error("Booking update failed", {
        logType: "Booking update error",
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  cancelBooking: async (req: Request) => {
    try {
      const input: BookingCancelProps = req.body;
      
      const room = await prisma.room.findUnique({
        where: { roomId: input.roomId },
        include: {
          Hotel: {
            select: { code: true },
          },
        },
      });
      
      if (!room) throw new NotFoundError("Room not found");

      const roomBooking = await prisma.roomBooking.findFirst({
        where: { bookingDetailId: input.bookingDetailId },
      });
      
      if (!roomBooking) throw new NotFoundError("Booking not found");

      await Promise.all([
        prisma.bookingDetail.update({
          where: { bookingDetailId: input.bookingDetailId },
          data: { status: "cancelled" },
        }),
        prisma.roomBooking.updateMany({
          where: { bookingDetailId: input.bookingDetailId },
          data: { isActive: false },
        }),
      ]);

      logger.info("Booking cancelled successfully", {
        logType: "Booking cancellation",
        bookingDetailId: input.bookingDetailId,
        roomId: input.roomId,
      });

      return {
        status: "success",
        message: "Booking cancelled successfully",
        data: null,
      };
    } catch (error) {
      logger.error("Booking cancellation failed", {
        logType: "Booking cancellation error",
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Failed to cancel booking");
    }
  },

  makeRefund: async (req: Request) => {
    try {
      const { bookingId, percentage, reason, accountId } =
        req.body as RefundCreationProps;

      const bookingDetail = await prisma.roomBooking.findUnique({
        where: { bookingId: bookingId },
        select: {
          bookingId: true,
          payPalBookingId: true,
          price: true,
          PayPalBooking: {
            select: {
              paymentId: true,
              paypalBookingId: true,
              transaction: true,
              captureId: true,
            },
          },
        },
      });

      if (!bookingDetail) throw new Error("Booking not found.");

      // Calculate total booking amount
      const totalBookingResult = await prisma.roomBooking.aggregate({
        _sum: { price: true },
        where: { payPalBookingId: bookingDetail.payPalBookingId },
      });

      const totalBookingAmount = totalBookingResult._sum.price || 0;

      // Calculate refund amounts
      const mainRefundAmount = Math.floor(
        (totalBookingAmount * percentage) / 100
      );

      // Create refund record in database
      await prisma.payPalRefund.create({
        data: {
          paypalBookingId: bookingDetail.payPalBookingId!,
          amount: totalBookingAmount,
          ssheaRemainingBalance: 0,
          remainingBalance: totalBookingAmount - mainRefundAmount,
          reason: reason || "Booking cancellation",
        },
      });

      // Update room booking status
      await prisma.roomBooking.updateMany({
        where: { payPalBookingId: bookingDetail.payPalBookingId },
        data: { isRefund: true },
      });

      logger.info("Refund processed successfully", {
        logType: "Refund processing",
        bookingId,
        refundAmount: mainRefundAmount,
        percentage,
      });

      return {
        status: "success",
        message: "Refund processed successfully",
        data: null,
      };
    } catch (error) {
      logger.error("Refund processing failed", {
        logType: "Refund error",
        error: error instanceof Error ? error.message : "Unknown error",
      });

      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong");
    }
  },

  updatePayPalBooking: async (input: PayPalBookingUpdateProps) => {
    try {
      await prisma.payPalBooking.update({
        where: { paypalBookingId: input.payPalBookingId },
        data: {
          captureId: input.captureId,
          paymentEmail: input.paymentEmail,
          payerId: input.payerId,
          paymentId: input.paymentId,
        },
      });

      return {
        status: "success",
        message: "PayPal booking updated successfully",
        data: null,
      };
    } catch (error) {
      logger.error("PayPal booking update failed", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      
      throw new Error("Something went wrong");
    }
  },
};