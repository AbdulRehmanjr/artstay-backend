import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import { Request } from "express";

export const propertyService = {
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.hotel.findUnique({
        where: {
          accountId: accountId,
        },
      });
      console.log(application);
      return {
        status: "success",
        message: "application status",
        data: application,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch application status");
    }
  },
  getAllRoomsByAccountId: async (req: Request) => {
    try {
      const { accountId } = req.params;
      const rooms: RoomTableProps[] = await prisma.room.findMany({
        where: {
          hotel: {
            accountId: accountId,
          },
        },
        include: {
          hotel: {
            select: {
              hotelId: true,
              name: true,
              phone: true,
              code: true,
              accountId: true,
            },
          },
        },
      });
      return { status: "success", message: "rooms fetched", data: rooms };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch rooms");
    }
  },
  getHotelByAccountId: async (req: Request) => {
    try {
      const { accountId } = req.params;
      const hotel = await prisma.hotel.findUnique({
        where: {
          accountId: accountId,
        },
      });
      return {
        status: "success",
        message: "hotel detail fetched",
        data: hotel,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch hotel");
    }
  },

  createRoom: async (req: Request) => {
    try {
      const roomData: RoomCreationProps = req.body;

      await prisma.room.create({
        data: {
          name: roomData.name,
          area: roomData.area,
          capacity: roomData.capacity,
          features: roomData.features,
          description: roomData.description,
          roomType: roomData.roomType,
          dp: roomData.dp,
          beds: roomData.beds,
          quantity: roomData.quantity,
          price: roomData.price,
          minimumstay: roomData.minimumstay,
          images: roomData.images,
          hotel: {
            connect: {
              accountId: roomData.accountId,
            },
          },
        },
      });
      return {
        status: "success",
        message: "create room",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to create room");
    }
  },
  toggleStatus: async (req: Request) => {
    try {
      const roomData: { status: boolean; roomId: string } = req.body;

      await prisma.room.update({
        where: { roomId: roomData.roomId },
        data: {
          isActive: !roomData.status,
        },
      });
      return {
        status: "success",
        message: "update status",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update room status");
    }
  },
};
