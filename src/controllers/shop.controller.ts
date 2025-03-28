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
        const shop: ShopDetailProps | null = await prisma.shop.findUnique({
            where: {
                shopId: shopId
            },
            include: {
                products: true
            }
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

        const shop = await prisma.shop.findUnique({
            where: {
                accountId: product.accountId
            }
        })

        if (!shop) {
            res.status(404).json({ status: 'error', message: 'Shop not found', data: null })
            return
        }

        await prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                images: product.images,
                category: product.category,
                material: product.material,
                dimensions: product.dimensions,
                weight: product.weight,
                stock: product.stock,
                craftType: product.craftType,
                artisanMade: product.artisanMade,
                isAvailable: product.isAvailable,

                shopId: shop.shopId,
            }
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
        const product: ProductUpdateProps = req.body
        await prisma.product.update({
            where: {
                productId: product.productId
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

export const getProductsByAccountId = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params
        const products: ProductProps[] = await prisma.product.findMany({
            where: {
                shop: {
                    accountId: accountId
                }
            },
            orderBy: {
                createdAt: "desc",
            },
            distinct: ['productId']
        })
        res.status(201).json({ status: 'success', message: 'products', data: products })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to get products',
            data: null
        });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const product: ProductProps | null = await prisma.product.findUnique({
            where: {
                productId: productId
            },
        })
        res.status(201).json({ status: 'success', message: 'product', data: product })
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to get product',
            data: null
        });
    }
}   

