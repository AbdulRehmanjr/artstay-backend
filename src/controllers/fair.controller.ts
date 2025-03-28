import { Request, Response } from 'express';
import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';

export const fairProfileByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const fair: FairProps | null = await prisma.fair.findFirst({
            where: {
                accountId: accountId
            },
        })
        res.status(201).json({ status: 'success', message: 'fair details', data: fair });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch fair details',
            data: null
        });
    }
}

export const createFairEvent= async (req: Request, res: Response) => {
    try {
        const event: FairEventCreationProps = req.body

        const fair = await prisma.fair.findFirst({
            where: {
                accountId: event.accountId
            },
            select: {
                fairId: true
            }
        })
        if (!fair) throw new Error("Fair seller not found.")
        await prisma.fairEvent.create({
            data: {
                fairId: fair.fairId,
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                fairType : event.fairType.toUpperCase() as FairTypeEnum,
                location: event.location.toUpperCase() as FairLocationEnum,
                longitude:event.longitude,
                latitude:event.latitude,
                description:event.description,
                vanue : event.vanue,
                organizer: event.organizer
            }
        })
        res.status(201).json({ status: 'success', message: 'fair event created', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create fair event',
            data: null
        });
    }
}

export const updateFairEvent= async (req: Request, res: Response) => {
    try {
        const event: FairEventUpdationProps = req.body

        await prisma.fairEvent.update({
            where : {eventId:event.eventId},
            data: {
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                fairType : event.fairType.toUpperCase() as FairTypeEnum,
                location: event.location.toUpperCase() as FairLocationEnum,
                longitude:event.longitude,
                latitude:event.latitude,
                description:event.description,
                vanue : event.vanue,
                organizer: event.organizer
            }      
        })
        res.status(201).json({ status: 'success', message: 'fair event updateds', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update fair event',
            data: null
        });
    }
}

export const getFairEvents = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params

        const events: FairEventProps[] = await prisma.fairEvent.findMany({
            where: {
                fair: {
                    accountId: accountId
                }
            }
        })
        res.status(201).json({ status: 'success', message: 'events fetched successfully', data: events });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch events',
            data: null
        });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params

        const event: FairEventProps = await prisma.fairEvent.findUniqueOrThrow({
            where: {
                eventId: eventId
            }
        })
        res.status(201).json({ status: 'success', message: 'event fetched successfully', data: event });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch event',
            data: null
        });
    }
};

export const allFairEvents = async (req: Request, res: Response) => {
    try {
        const queryParams = req.query
        const limit = Number(queryParams.limit)
        const skip = Number(queryParams.cursor ?? 0)
        const totalCount = await prisma.artisan.count();

        const fairs: FairProps[] = await prisma.fair.findMany({
            take: limit,
            skip: skip,
            orderBy: {
                createdAt: "desc",
            },
            distinct: ['fairId']
        })

        const nextCursor = skip + limit;
        const hasNextPage = nextCursor < totalCount;

        res.status(201).json({
            status: 'success', message: 'all safaris', data: {
                fairs: fairs,
                metadata: {
                    cursor: hasNextPage ? nextCursor.toString() : undefined,
                    hasNextPage,
                    totalItems: totalCount, // Use total count here
                    currentPage: Math.floor(skip / limit) + 1,
                    totalPages: Math.ceil(totalCount / limit), // Use total count here
                }
            },
        });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all fairs',
            data: null
        });
    }
}

export const fairDetailById = async (req: Request, res: Response) => {
    try {
        const { fairId } = req.params
        const fairs: FairDetailProps | null = await prisma.fair.findUnique({
            where: {
                fairId: fairId
            },
            include: {
                FairEvent: true,
            }
        })
        res.status(201).json({ status: 'success', message: 'fairs details', data: fairs });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch fairs details',
            data: null
        });
    }
}