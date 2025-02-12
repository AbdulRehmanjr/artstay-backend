import { logger } from "~/utils/logger";
import { Request, Response } from 'express';
import prisma from "~/libs/prisma";

export const createArtisanPackage = async (req: Request, res: Response) => {
    try {
        const packageReq: ArtisanPackageRequestProps = req.body
        await prisma.artisanPackage.create({
            data: {
                artisanId: packageReq.artisanId,
                duration: packageReq.duration,
                experience: packageReq.experience,
                features: packageReq.features
            }
        })
        res.status(201).json({ status: 'success', message: 'package created successfully', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create account',
            data: null
        });
    }
};