import { Request, Response } from 'express';
import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';
import { Certificate, Education, Experience, Recognition, Training } from '@prisma/client';
import { hash } from 'bcrypt';


export const createArtisan = async (req: Request, res: Response) => {
    try {
        const artisan: ArtisanCreationProps = req.body
        const hashedPassword = await hash(artisan.password, 10);

        const [account, portfolio] = await Promise.all([
            prisma.account.create({
                data: {
                    email: artisan.email,
                    password: hashedPassword,
                    accountType: 'ARTISAN' as AccountTypeEnum
                }
            }),
            prisma.portfolio.create({})
        ])

        await prisma.artisan.create({
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
                portfolioId: portfolio.portfolioId

            }
        })

        res.status(201).json({ status: 'success', message: 'artisan created', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create artisan',
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

        res.status(201).json({ status: 'success', message: 'artisan updated', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update artisan',
            data: null
        });
    }
};

export const createSafari = async (req: Request, res: Response) => {
    try {
        const safari: SafariCreationProps = req.body
        const hashedPassword = await hash(safari.password, 10);
        const account = await prisma.account.create({
            data: {
                email: safari.email,
                password: hashedPassword,
                accountType: 'SAFARI' as AccountTypeEnum
            }
        });

        await prisma.safari.create({
            data: {
                firstName: safari.firstName,
                lastName: safari.lastName,
                address: safari.address,
                description: safari.description,
                dp: safari.dp,
                accountId: account.userId,
            }
        })

        res.status(201).json({ status: 'success', message: 'safari created', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create safari',
            data: null
        });
    }
};

export const updateSafari = async (req: Request, res: Response) => {
    try {
        const safari = req.body

        await prisma.safari.updateMany({
            where: { accountId: safari.accountId },
            data: {
                firstName: safari.firstName,
                lastName: safari.lastName,
                address: safari.address,
                description: safari.description,
                dp: safari.dp
            }
        })

        res.status(201).json({ status: 'success', message: 'safari updated', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update safari',
            data: null
        });
    }
};