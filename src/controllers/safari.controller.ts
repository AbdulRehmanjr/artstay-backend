import { Request, Response } from 'express';
import prisma from '~/libs/prisma';
import { safariService } from '~/services/safari.service';
import { logger } from '~/utils/logger';



export const getApplicationStatus = async (req: Request, res: Response) => {
    try {
        const result = await safariService.getApplicationStatus(req.params.accountId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch application status',
            data: null
        });
    }
}
export const safariDetailByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const safari: SafariProps | null = await prisma.safari.findUnique({
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

        const safari = await prisma.safari.findUnique({
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

export const getAllSafaris= async (req: Request, res: Response) => {
    try {
       const result = await safariService.getAllSafaris()
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all safaris',
            data: null
        });
    }
}

export const getAllSafarisPagination = async (req: Request, res: Response) => {
    try {
       const result = await safariService.getAllSafarisPagination(req)
        res.status(201).json(result);
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