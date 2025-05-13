import prisma from "~/libs/prisma";
import { logger } from "~/utils/logger";
import { Request } from "express";

export const shopService = {
  getApplicationStatus: async (accountId: string) => {
    try {
      const application = await prisma.shop.findUnique({
        where: {
          accountId: accountId,
        },
      });
      return {
        status: "success",
        message: "application status",
        data: application,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch application status");
    }
  },
  getFilterOptions: async () => {
    try {
      const shops = await prisma.shop.findMany({
        select: {
          city: true,
          state: true,
          country: true,
          isHandmade: true,
          vendorType: true,
          deliveryTime: true,
          productCategories: true,
        },
      });

      // Extract all unique product categories from the database
      const allCategories = new Set();
      shops.forEach((shop) => {
        shop.productCategories.forEach((category) => {
          allCategories.add(category);
        });
      });

      return {
        status: "success",
        message: "fetched all filters",
        data: {
          productCategories: Array.from(allCategories).sort(),
          locations: {
            cities: [...new Set(shops.map((shop) => shop.city))].filter(
              (city) => city !== "none"
            ),
            states: [...new Set(shops.map((shop) => shop.state))].filter(
              (state) => state !== "none"
            ),
            countries: [...new Set(shops.map((shop) => shop.country))].filter(
              (country) => country !== "none"
            ),
          },
          vendorTypes: [
            ...new Set(shops.map((shop) => shop.vendorType)),
          ].filter((type) => type !== "none"),
          handmadeOptions: [...new Set(shops.map((shop) => shop.isHandmade))],
          deliveryTimes: [
            ...new Set(shops.map((shop) => shop.deliveryTime)),
          ].filter((time) => time !== "none"),
          certificationOptions: ["giCertified"],
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch filters");
    }
  },
  getAllShopsPagination: async (req: Request) => {
    try {
      const queryParams = req.query;
      const limit = Number(queryParams.limit);
      const skip = Number(queryParams.cursor ?? 0);
      const totalCount = await prisma.shop.count();

      const shops = await prisma.shop.findMany({
        take: limit,
        skip: skip,
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["shopId"],
      });

      const nextCursor = skip + limit;
      const hasNextPage = nextCursor < totalCount;

      return {
        status: "success",
        message: "all shops",
        data: {
          shops: shops,
          metadata: {
            cursor: hasNextPage ? nextCursor.toString() : undefined,
            hasNextPage,
            totalItems: totalCount,
            currentPage: Math.floor(skip / limit) + 1,
            totalPages: Math.ceil(totalCount / limit),
          },
        },
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch all shops");
    }
  },
  getAllShops: async () => {
    try {
      const shops = await prisma.shop.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: "success",
        message: "all shops",
        data: shops,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch all shops");
    }
  },
  getShopByAccountId: async (accountId: string) => {
    try {
      const shop = await prisma.shop.findUnique({
        where: {
          accountId: accountId,
        },
      });

      return {
        status: "success",
        message: "shops details",
        data: shop,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch shop details");
    }
  },
  getShopById: async (shopId: string) => {
    try {
      const shop = await prisma.shop.findUnique({
        where: {
          shopId: shopId,
        },
        include: {
          products: true,
        },
      });

      return {
        status: "success",
        message: "shop details",
        data: shop,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to fetch shop details");
    }
  },
  createProduct: async (product: ProductCreationProps) => {
    try {
      const shop = await prisma.shop.findUnique({
        where: {
          accountId: product.accountId,
        },
      });

      if (!shop) {
        throw new Error("Shop not found");
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
        },
      });

      return {
        status: "success",
        message: "product created",
        data: product,
      };
    } catch (error) {
      logger.error(error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create product"
      );
    }
  },
  updateProduct: async (product: ProductUpdateProps) => {
    try {
      await prisma.product.update({
        where: {
          productId: product.productId,
        },
        data: product,
      });

      return {
        status: "success",
        message: "product updated",
        data: product,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to update product");
    }
  },
  getProductsByAccountId: async (accountId: string) => {
    try {
      const products = await prisma.product.findMany({
        where: {
          shop: {
            accountId: accountId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        distinct: ["productId"],
      });

      return {
        status: "success",
        message: "products",
        data: products,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to get products");
    }
  },
  getProductById: async (productId: string) => {
    try {
      const product = await prisma.product.findUnique({
        where: {
          productId: productId,
        },
      });

      return {
        status: "success",
        message: "product",
        data: product,
      };
    } catch (error) {
      logger.error(error);
      throw new Error("Failed to get product");
    }
  },
};
