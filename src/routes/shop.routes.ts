import { Router } from 'express';
import { allShops, createProduct, getProductById, getProductsByAccountId, shopDetailByAccountId, shopDetailByShopId, updateProduct } from '~/controllers/shop.controller';
import { validate } from '~/middlewares/zod.middleware';
import { productCreationSchema, productUpdateSchema } from '~/schemas/shop';


const router = Router();

router.get('/all',allShops)
router.get('/:shopId',shopDetailByShopId)
router.get('/detail/:accountId',shopDetailByAccountId)
router.get('/products/:accountId',getProductsByAccountId)
router.get('/product/:productId',getProductById)

router.post('/product',validate(productCreationSchema),createProduct)
router.patch('/product',validate(productUpdateSchema),updateProduct)


export const shopRouter = router;