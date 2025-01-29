import { Request, Response } from 'express';
import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';

export const createCraft = async (req: Request, res: Response) => {
    try {
        const { craftName, craftSlug } = req.body
        await prisma.craft.create({
            data: {
                craftName,
                craftSlug
            }
        })
        logger.info('----NEW CRAFT ADDED-----')
        res.status(201).json({ status: 'success', message: 'craft added', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create account',
            data: null
        });
    }
};


export const createSubCraft = async (req: Request, res: Response) => {
    try {
        const { subCraftName, subCraftSlug, craftId } = req.body
        await prisma.subCraft.create({
            data: {
                subCraftName,
                subCraftSlug,
                craftId
            }
        })
        logger.info('----NEW SUB CRAFT ADDED-----')
        res.status(201).json({ status: 'success', message: 'sub craft added', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create account',
            data: null
        });
    }
};

export const getAllCrafts = async (req: Request, res: Response) => {
    try {
        const crafts = await prisma.craft.findMany()
        res.status(201).json({ status: 'success', message: 'fetched all crafts', data: crafts });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch crafts',
            data: null
        });
    }
};


export const getAllSubCraftsByCraftId = async (req: Request, res: Response) => {
    try {
        const { craftId } = req.params
        const subcrafts = await prisma.subCraft.findMany({
            where: {
                craftId: craftId
            }
        })
        res.status(201).json({ status: 'success', message: 'fetched all subcrafts', data: subcrafts });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch sub crafts',
            data: null
        });
    }
};