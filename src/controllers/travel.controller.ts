import { Request, Response } from 'express';
import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';


export const allShops = async (req: Request, res: Response) => {
    try {
        const queryParams = req.query
        const limit = Number(queryParams.limit)
        const skip = Number(queryParams.cursor ?? 0)
        const totalCount = await prisma.artisan.count();

        const shops: ShopProps[] = await prisma.shop.findMany({
            take: limit,
            skip: skip,
            orderBy: {
                createdAt: "desc",
            },
            distinct: ['shopId']
        })

        const nextCursor = skip + limit;
        const hasNextPage = nextCursor < totalCount;

        res.status(201).json({
            status: 'success', message: 'all shops', data: {
                shops: shops,
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
            message: error instanceof Error ? error.message : 'Failed to fetch all shops',
            data: null
        });
    }
}

export const travelDetailByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const travel: TravelPlanerProps | null = await prisma.travelPlaner.findUnique({
            where: {
                accountId: accountId
            },
        })
        res.status(201).json({ status: 'success', message: 'travel profile', data: travel });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch travel profile',
            data: null
        });
    }
}

export const shopDetailByShopId = async (req: Request, res: Response) => {
    try {
        const { shopId } = req.params
        const shop: ShopDetailProps | null = await prisma.shop.findUnique({
            where: {
                shopId: shopId
            },
            include: {
                products: true
            }
        })
        res.status(201).json({ status: 'success', message: 'shop details', data: shop });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch shop details',
            data: null
        });
    }
}

export const createTravelTour = async (req: Request, res: Response) => {
    try {
        const travelTour: TravelTourCreationProps = req.body

        const travelPlaner = await prisma.travelPlaner.findUnique({
            where: {
                accountId: travelTour.accountId
            }
        })

        if (!travelPlaner) {
            res.status(404).json({ status: 'error', message: 'Travel Planer not found', data: null })
            return
        }

        await prisma.travelTour.create({
            data: {
                title: travelTour.title,
                description: travelTour.description,
                price: travelTour.price,
                image: travelTour.image,
                duration: travelTour.duration,
                isPricePerPerson: travelTour.isPricePerPerson,
                maxGroupSize: travelTour.maxGroupSize,
                languages: travelTour.languages,
                features: travelTour.features,
                isActive: travelTour.isActive,
                travelPlanerId: travelPlaner.travelPlanerId,
            }
        })
        res.status(201).json({ status: 'success', message: 'travel tour created', data: travelTour })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create travel tour',
            data: null
        });
    }
}

export const updateTravelTour = async (req: Request, res: Response) => {
    try {
            const travelTour: TravelTourUpdateProps = req.body
        await prisma.travelTour.update({
            where: {
                tourId: travelTour.tourId
            },
            data: travelTour
        })
        res.status(201).json({ status: 'success', message: 'travel tour updated', data: travelTour })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update travel tour',
            data: null
        });
    }
}

export const getTravelTours = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const travelTours: TravelTourProps[] = await prisma.travelTour.findMany({
            where: {
                travelPlaner: {
                    accountId: accountId
                }
            },
            orderBy: {
                createdAt: "desc",
            },
            distinct: ['tourId']
        })
        res.status(201).json({ status: 'success', message: 'travel tours', data: travelTours })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to get travel tours',
            data: null
        });
    }
}

export const getTravelTourById = async (req: Request, res: Response) => {
    try {
        const { tourId } = req.params
        const tour: TravelTourProps | null = await prisma.travelTour.findUnique({
            where: {
                tourId: tourId
            },
        })
        res.status(201).json({ status: 'success', message: 'travel tour', data: tour })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to get travel tour',
            data: null
        });
    }
}   

