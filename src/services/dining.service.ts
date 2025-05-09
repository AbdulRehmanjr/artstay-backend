import prisma from "~/libs/prisma"
import { logger } from "~/utils/logger"
import { Request } from "express"

export const diningService = {
    getAllRestaurantsPagination: async (req: Request) => {
        try {
            const queryParams = req.query
            const limit = Number(queryParams.limit)
            const skip = Number(queryParams.cursor ?? 0)
            const totalCount = await prisma.restaurant.count();

            const dinings = await prisma.restaurant.findMany({
                take: limit,
                skip: skip,
                orderBy: {
                    createdAt: "desc",
                },
                distinct: ['restaurantId']
            })

            const nextCursor = skip + limit;
            const hasNextPage = nextCursor < totalCount;

            return {
                status: 'success', 
                message: 'all dinings', 
                data: {
                    dinings: dinings,
                    metadata: {
                        cursor: hasNextPage ? nextCursor.toString() : undefined,
                        hasNextPage,
                        totalItems: totalCount,
                        currentPage: Math.floor(skip / limit) + 1,
                        totalPages: Math.ceil(totalCount / limit),
                    }
                }
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to fetch all dinings')
        }
    },
    
    getRestaurantByAccountId: async (accountId: string) => {
        try {
            const restaurant = await prisma.restaurant.findUnique({
                where: {
                    accountId: accountId
                }
            })
            
            return {
                status: 'success',
                message: 'restaurants details',
                data: restaurant
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to fetch restaurant details')
        }
    },
    
    getRestaurantById: async (restaurantId: string) => {
        try {
            const restaurant = await prisma.restaurant.findUnique({
                where: {        
                    restaurantId: restaurantId
                },
                include: {
                    menu: true
                }
            })
            
            return {
                status: 'success',
                message: 'restaurant details',
                data: restaurant
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to fetch restaurant details')
        }
    },
    
    getMenuItems: async (accountId: string) => {
        try {
            const menuItems = await prisma.menuItem.findMany({
                where: {
                    restaurant: {
                        accountId: accountId
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
            
            return {
                status: 'success',
                message: 'menu items',
                data: menuItems
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to fetch menu items')
        }
    },
    
    createMenuItem: async (menuItem: MenuItemCreationProps) => {
        try {
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
            
            return {
                status: 'success',
                message: 'menu item created',
                data: null
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to create menu item')
        }
    },
    
    updateMenuItem: async (menuItemId: string, menuItem: MenuItemCreationProps) => {
        try {
            await prisma.menuItem.update({
                where: {
                    menuItemId: menuItemId
                },
                data: menuItem
            })
            
            return {
                status: 'success',
                message: 'menu item updated',
                data: null
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to update menu item')
        }
    }
}