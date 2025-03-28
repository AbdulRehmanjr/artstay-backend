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

        await prisma.artisan.update({
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

        await prisma.safari.update({
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

export const createFair = async (req: Request, res: Response) => {
    try {
        const fair: FairCreationProps = req.body
        const hashedPassword = await hash(fair.password, 10);
        const account = await prisma.account.create({
            data: {
                email: fair.email,
                password: hashedPassword,
                accountType: 'FAIRS' as AccountTypeEnum
            }
        });

        await prisma.fair.create({
            data: {
                firstName: fair.firstName,
                lastName: fair.lastName,
                address: fair.address,
                description: fair.description,
                dp: fair.dp,
                accountId: account.userId,
            }
        })

        res.status(201).json({ status: 'success', message: 'fair created', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create fair',
            data: null
        });
    }
};

export const updateFair = async (req: Request, res: Response) => {
    try {
        const fair = req.body

        await prisma.fair.update({
            where: { accountId: fair.accountId },
            data: {
                firstName: fair.firstName,
                lastName: fair.lastName,
                address: fair.address,
                description: fair.description,
                dp: fair.dp
            }
        })

        res.status(201).json({ status: 'success', message: 'fair updated', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update fair',
            data: null
        });
    }
};

export const createShop = async (req: Request, res: Response) => {
    try {
        const vendorData: ShopCreationProps = req.body;

        const hashedPassword = await hash(vendorData.password, 10);
        const account = await prisma.account.create({
            data: {
                email: vendorData.email,
                password: hashedPassword,
                accountType: 'BUSINESS' as AccountTypeEnum
            }
        });

        await prisma.shop.create({
            data: {
                businessName: vendorData.businessName,
                shopName: vendorData.shopName,
                vendorType: vendorData.vendorType,
                address: vendorData.address,
                city: vendorData.city,
                state: vendorData.state,
                country: vendorData.country,
                zipCode: vendorData.zipCode,
                ownerName: vendorData.ownerName,
                phoneNumber: vendorData.phoneNumber,
                website: vendorData.website,
                description: vendorData.description,
                productCategories: vendorData.productCategories,
                isGICertified: vendorData.isGICertified,
                isHandmade: vendorData.isHandmade,
                pickupOptions: vendorData.pickupOptions,
                deliveryTime: vendorData.deliveryTime,
                deliveryFee: vendorData.deliveryFee,
                pricingStructure: vendorData.pricingStructure,
                orderProcessing: vendorData.orderProcessing,
                paymentMethods: vendorData.paymentMethods,
                returnPolicy: vendorData.returnPolicy,
                stockAvailability: vendorData.stockAvailability,
                offersCustomization: vendorData.offersCustomization,
                packagingType: vendorData.packagingType,
                shopTiming: vendorData.shopTiming,
                workingDays: vendorData.workingDays,
                agreedToTerms: vendorData.agreedToTerms,
                agreedToBlacklist: vendorData.agreedToBlacklist,
                dp: vendorData.dp,
                accountId: account.userId
            }
        });

        res.status(201).json({
            status: 'success',
            message: 'Vendor registration successful',
            data: null
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to register vendor',
            data: null
        });
    }
};

export const updateShop = async (req: Request, res: Response) => {
    try {
        const shop = req.body

        await prisma.shop.update({
            where: { accountId: shop.accountId },
            data: {
                shopName: shop.shopName,
                address: shop.address,
                shopTiming: shop.shopTiming,
                workingDays: shop.workingDays,
                description: shop.description,
                dp: shop.dp
            }
        })

        res.status(201).json({ status: 'success', message: 'shop updated', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update shop',
            data: null
        });
    }
};

export const createRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant: RestaurantCreationProps = req.body
        const hashedPassword = await hash(restaurant.password, 10);
        const account = await prisma.account.create({
            data: {
                email: restaurant.email,
                password: hashedPassword,
                accountType: 'RESTAURANT' as AccountTypeEnum
            }
        });

        await prisma.restaurant.create({
            data: {
                name: restaurant.name,
                description: restaurant.description,
                location: restaurant.location,
                cuisine: restaurant.cuisine,
                priceRange: restaurant.priceRange,
                image: restaurant.image,
                accountId: account.userId
            }
        })

        res.status(201).json({ status: 'success', message: 'restaurant created', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create restaurant',
            data: null
        });
    }
}

export const updateRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = req.body
        await prisma.restaurant.update({
            where: { restaurantId: restaurant.restaurantId },
            data: {
                name: restaurant.name,
                description: restaurant.description,
                location: restaurant.location,
                priceRange: restaurant.priceRange,
                image: restaurant.image
            }
        })

        res.status(201).json({ status: 'success', message: 'restaurant updated', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update restaurant',
            data: null
        });
    }
}

export const createTravelPlaner = async (req: Request, res: Response) => {
    try {
        const travelPlaner: TravelPlanerCreationProps = req.body
        const hashedPassword = await hash(travelPlaner.password, 10);
        const account = await prisma.account.create({
            data: {
                email: travelPlaner.email,
                password: hashedPassword,
                accountType: 'TRAVEL_PLANER' as AccountTypeEnum
            }
        })
        await prisma.travelPlaner.create({
            data: {
                name: travelPlaner.name,
                description: travelPlaner.description,
                location: travelPlaner.location,
                priceRange: travelPlaner.priceRange,
                language: travelPlaner.language,
                speciality: travelPlaner.speciality,
                dp: travelPlaner.dp,
                accountId: account.userId
            }
        })

        res.status(201).json({ status: 'success', message: 'travel planer created', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create travel planer',
            data: null
        });
    }
}

export const updateTravelPlaner = async (req: Request, res: Response) => {
    try {
        const travelPlaner = req.body

        await prisma.travelPlaner.update({
            where: { accountId: travelPlaner.accountId },
            data: {
                name: travelPlaner.name,
                description: travelPlaner.description,
                location: travelPlaner.location,
                priceRange: travelPlaner.priceRange,
                language: travelPlaner.language,
                speciality: travelPlaner.speciality,
                dp: travelPlaner.dp
            }
        })

        res.status(201).json({ status: 'success', message: 'travel planer updated', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update travel planer',
            data: null
        });
    }
}
