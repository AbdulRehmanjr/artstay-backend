import { Request, Response } from 'express';
import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';



export const artisanDetailByAccountId = async (req: Request, res: Response) => {
    try {

        const { accountId } = req.params
        const artisan: ArtisanDetailProps | null = await prisma.artisan.findUnique({
            where: {
                accountId: accountId
            },
            include: {
                craft: true,
                subCraft: true
            }
        })

        res.status(201).json({ status: 'success', message: 'artisan details', data: artisan });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch artisan details',
            data: null
        });
    }
}

export const artisanDetailByArtisanId = async (req: Request, res: Response) => {
    try {

        const { artisanId } = req.params
        const artisan: ArtisanPortolioProps | null = await prisma.artisan.findUnique({
            where: {
                artisanId: artisanId
            },
            include: {
                craft: true,
                subCraft: true,
                Portfolio: true,
                ArtisanPackage:true
            }
        })
        res.status(201).json({ status: 'success', message: 'artisan details', data: artisan });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch artisan details',
            data: null
        });
    }
}

export const allArtisans = async (req: Request, res: Response) => {
    try {
        const queryParams = req.query
        const limit = Number(queryParams.limit)
        const skip = Number(queryParams.cursor ?? 0)
        const totalCount = await prisma.artisan.count();

        const artisans: ArtisanDetailProps[] = await prisma.artisan.findMany({
            include: {
                craft: true,
                subCraft: true
            },
            take: limit,
            skip: skip,
            orderBy: {
                createdAt: "desc",
            },
            distinct: ['artisanId']
        })

        const nextCursor = skip + limit;
        const hasNextPage = nextCursor < totalCount;

        res.status(201).json({
            status: 'success', message: 'all artisan', data: {
                artisans: artisans,
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
            message: error instanceof Error ? error.message : 'Failed to fetch all artisans',
            data: null
        });
    }
}

export const getPortfolioByArtisanId = async (req: Request, res: Response) => {
    try {
        const { artisanId } = req.params
        const portfolio = await prisma.portfolio.findFirst({
            where: {
                Artisan: {
                    some: {
                        accountId: artisanId
                    }
                }
            }
        })
        res.status(201).json({
            status: 'success',
            message: 'all portfolio',
            data: portfolio,
        });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all artisans',
            data: null
        });
    }
}

export const updatePortfolioArtisanId = async (req: Request, res: Response) => {
    try {
        const { accountId, images } = req.body
        await prisma.portfolio.updateMany({
            where: {
                Artisan: {
                    some: {
                        accountId: accountId
                    }
                }
            },
            data: {
                images: images
            }
        })
        res.status(201).json({
            status: 'success',
            message: 'updated portfolio',
            data: null,
        });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all artisans',
            data: null
        });
    }
}