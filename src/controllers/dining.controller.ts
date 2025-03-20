

import { Request, Response } from 'express';
import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';


export const allRestaurants = async (req: Request, res: Response) => {
    try {
        const queryParams = req.query
        const limit = Number(queryParams.limit)
        const skip = Number(queryParams.cursor ?? 0)
        const totalCount = await prisma.restaurant.count();

        const dinings: RestaurantProps[] = await prisma.restaurant.findMany({
            take: limit,
            skip: skip,
            orderBy: {
                createdAt: "desc",
            },
            distinct: ['restaurantId']
        })

        const nextCursor = skip + limit;
        const hasNextPage = nextCursor < totalCount;

        res.status(201).json({
            status: 'success', message: 'all dinings', data: {
                dinings: dinings,
                metadata: {
                    cursor: hasNextPage ? nextCursor.toString() : undefined,
                    hasNextPage,
                    totalItems: totalCount, 
                    currentPage: Math.floor(skip / limit) + 1,
                    totalPages: Math.ceil(totalCount / limit),
                }
            },
        });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch all dinings',
            data: null
        });
    }
}

export const restaurantDetailByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const restaurants: RestaurantProps | null = await prisma.restaurant.findUnique({
            where: {
                accountId: accountId
            },
        })
        res.status(201).json({ status: 'success', message: 'restaurants details', data: restaurants });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch restaurants details',
            data: null
        });
    }
}

export const restaurantDetailByRestaurantId = async (req: Request, res: Response) => {
    try {
        const { restaurantId } = req.params
        const restaurant: RestaurantDetailProps | null = await prisma.restaurant.findUnique({
            where: {        
                restaurantId: restaurantId
            },
            include: {
                menu: true
            }
        })
        res.status(201).json({ status: 'success', message: 'restaurant details', data: restaurant });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch restaurant details',
            data: null
        });
    }
}

export const getMenuItemsByRestaurant = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const menuItems: MenuItemProps[] = await prisma.menuItem.findMany({
            where: {
                restaurant: {
                    accountId: accountId
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        res.status(201).json({ status: 'success', message: 'menu items', data: menuItems });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch menu items',
            data: null
        });
    }
}

export const createMenuItem = async (req: Request, res: Response) => {
    try {
        const { menuItem }: { menuItem: MenuItemCreationProps } = req.body
        await prisma.menuItem.create({
            data: {
                name: menuItem.name,
                description: menuItem.description,
                price: menuItem.price,
                category: menuItem.category,
                isVegetarian: menuItem.isVegetarian,
                isVegan: menuItem.isVegan,
                isGlutenFree: menuItem.isGlutenFree,
                spicyLevel: menuItem.spicyLevel,
                image: menuItem.image,

                restaurant: {
                    connect: {
                        accountId: menuItem.accountId
                    }
                }
            }
        })
        res.status(201).json({ status: 'success', message: 'menu item created', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create menu item',
            data: null
        })
    }
}

export const updateMenuItem = async (req: Request, res: Response) => {
    try {
        const { menuItemId } = req.params
        const { menuItem }: { menuItem: MenuItemCreationProps } = req.body
        await prisma.menuItem.update({
            where: {
                menuItemId: menuItemId
            },
            data: menuItem
        })  
        res.status(201).json({ status: 'success', message: 'menu item updated', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update menu item',
            data: null
        })
    }
}
