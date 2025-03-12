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

export const shopDetailByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const shops: ShopProps | null = await prisma.shop.findUnique({
            where: {
                accountId: accountId
            },
        })
        res.status(201).json({ status: 'success', message: 'shops details', data: shops });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch shops details',
            data: null
        });
    }
}

export const shopDetailByShopId = async (req: Request, res: Response) => {
    try {
        const { shopId } = req.params
        const shop: ShopProps | null = await prisma.shop.findUnique({
            where: {
                shopId: shopId
            },
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

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product: ProductCreationProps = req.body
        await prisma.product.create({
            data: product
        })
        res.status(201).json({ status: 'success', message: 'product created', data: product })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create product',
            data: null
        });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const product: ProductCreationProps = req.body
        await prisma.product.update({
            where: {
                productId: productId
            },
            data: product
        })
        res.status(201).json({ status: 'success', message: 'product updated', data: product })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update product',
            data: null
        });
    }
}
