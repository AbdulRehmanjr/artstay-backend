import { Request, Response } from 'express';
import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';


export const getHotelByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const hotel = await prisma.hotel.findUnique({
            where: {
                accountId: accountId
            }
        })
        res.status(201).json({ status: 'success', message: 'hotel detail fetched', data: hotel })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create product',
            data: null
        });
    }
}
export const createHotel = async (req: Request, res: Response) => {
    try {
        const hotel: HotelCreationProps = req.body
        await prisma.hotel.create({
            data: {
                name: hotel.name,
                description: hotel.description,
                accountId: hotel.accountId,
                address: hotel.address,
                longitude: hotel.longitude,
                latitude: hotel.latitude,
                images: hotel.images,
                firstName: hotel.firstName,
                lastName: hotel.lastName,
                email: hotel.email,
                phone: hotel.phone,
                checkIn: hotel.checkIn,
                checkOut: hotel.checkOut,
            }
        })
        res.status(201).json({ status: 'success', message: 'hotel created', data: null })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create hotel',
            data: null
        });
    }
}

export const updateHotel = async (req: Request, res: Response) => {
    try {
        const hotel: HotelUpdateProps = req.body
        await prisma.hotel.update({
            where: {
                hotelId: hotel.hotelId
            },
            data: hotel
        })
        res.status(201).json({ status: 'success', message: 'hotel updated', data: null })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update hotel',
            data: null
        });
    }
}

export const getAllRoomsByHotelId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const rooms: RoomProps[] = await prisma.room.findMany({
            where: {
                hotel: {
                    accountId: accountId
                }
            }
        })
        res.status(201).json({ status: 'success', message: 'rooms fetched', data: rooms })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to get all rooms by hotel id',
            data: null
        });
    }
}   
