import { Request, Response } from 'express';
import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';
import { Certificate, Education, Experience, Recognition, Training } from '@prisma/client';
import { hash } from 'bcrypt';

export const createArtisan = async (req: Request, res: Response) => {
    try {
        const artisan: ArtisanProps = req.body
        const hashedPassword = await hash(artisan.password, 10);
        const account = await prisma.account.create({
            data: {
                email: artisan.email,
                password: hashedPassword,
                accountType: 'ARTISAN' as AccountTypeEnum
            }
        });

        const response = await prisma.artisan.create({
            data: {
                firstName: artisan.firstName,
                lastName: artisan.lastName,
                address: artisan.address,
                description: artisan.description,
                dp: artisan.dp,
                experience: artisan.experience as Experience,
                education: artisan.education as Education,
                certificate: artisan.certificate as Certificate,
                training: artisan.training as Training,
                recongnition: artisan.recognition as Recognition,
                subCraftId: artisan.subCraftId,
                craftId: artisan.craftId,
                accountId: account.userId,
            }
        })
        await prisma.portfolio.create({
            data: {
                artisanId: response.artisanId
            }
        })
        res.status(201).json({ status: 'success', message: 'account created', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create account',
            data: null
        });
    }
};

export const updateArtisan = async (req: Request, res: Response) => {
    try {
        const artisan = req.body

        await prisma.artisan.updateMany({
            where: { accountId: artisan.accountId },
            data: {
                firstName: artisan.firstName,
                lastName: artisan.lastName,
                address: artisan.address,
                description: artisan.description,
                dp: artisan.dp,
                experience: artisan.experience as Experience,
                education: artisan.education as Education,
                certificate: artisan.certificate as Certificate,
                training: artisan.training as Training,
                recongnition: artisan.recognition as Recognition,
                subCraftId: artisan.subCraftId,
                craftId: artisan.craftId
            }
        })

        res.status(201).json({ status: 'success', message: 'account created', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create account',
            data: null
        });
    }
};

export const artisanDetailByAccountId = async (req: Request, res: Response) => {
    try {

        const { accountId } = req.params
        const artisan: ArtisanDetailProps | null = await prisma.artisan.findFirst({
            where: {
                accountId: accountId
            },
            include: {
                craft: true,
                subCraft: true
            }
        })

        res.status(201).json({ status: 'success', message: 'account created', data: artisan });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create account',
            data: null
        });
    }

}