import { Request, Response } from 'express';
import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';

export const safariDetailByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const safari: SafariProps | null = await prisma.safari.findFirst({
            where: {
                accountId: accountId
            },
        })
        res.status(201).json({ status: 'success', message: 'safari details', data: safari });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch safari details',
            data: null
        });
    }
}

export const createSafariTour = async (req: Request, res: Response) => {
    try {
        const tour: SafariTourCreationProps = req.body

        const safari = await prisma.safari.findFirst({
            where: {
                accountId: tour.accountId
            },
            select: {
                safariId: true
            }
        })
        if (!safari) throw new Error("Safari seller not found.")
        await prisma.safariTour.create({
            data: {
                safariId: safari.safariId,
                title: tour.title,
                fee: tour.fee,
                duration: tour.duration,
                description: tour.description,
                features: tour.features,
                operator: tour.operator
            }
        })
        res.status(201).json({ status: 'success', message: 'safari details', data: safari });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch safari details',
            data: null
        });
    }
}


export const getSafariTours = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params

        const tours: SafariTourProps[] = await prisma.safariTour.findMany({
            where: {
                safari: {
                    accountId: accountId
                }
            }
        })
        res.status(201).json({ status: 'success', message: 'tours fetched successfully', data: tours });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch tours',
            data: null
        });
    }
};


export const getTourById = async (req: Request, res: Response) => {
    try {
        const { tourId } = req.params

        const tour: SafariTourProps = await prisma.safariTour.findUniqueOrThrow({
            where: {
                tourId: tourId
            }
        })
        res.status(201).json({ status: 'success', message: 'tour fetched successfully', data: tour });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch tour',
            data: null
        });
    }
};

export const allSafaris = async (req: Request, res: Response) => {
    try {
        const queryParams = req.query
        const limit = Number(queryParams.limit)
        const skip = Number(queryParams.cursor ?? 0)
        const totalCount = await prisma.artisan.count();

        const safaris: SafariProps[] = await prisma.safari.findMany({
            take: limit,
            skip: skip,
            orderBy: {
                createdAt: "desc",
            },
            distinct: ['safariId']
        })

        const nextCursor = skip + limit;
        const hasNextPage = nextCursor < totalCount;

        res.status(201).json({
            status: 'success', message: 'all safaris', data: {
                safaris: safaris,
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
            message: error instanceof Error ? error.message : 'Failed to fetch all safaris',
            data: null
        });
    }
}

export const safariDetailById = async (req: Request, res: Response) => {
    try {

        const { safariId } = req.params
        const safari: SafariDetailProps | null = await prisma.safari.findUnique({
            where: {
                safariId: safariId
            },
            include: {
                SafariTour: true,
            }
        })
        res.status(201).json({ status: 'success', message: 'safari details', data: safari });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch safari details',
            data: null
        });
    }
}