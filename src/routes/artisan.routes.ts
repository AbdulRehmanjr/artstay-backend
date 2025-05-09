import { Router } from 'express';
import {  artisanApplicationStatus, artisanDetailByAccountId, artisanDetailByArtisanId, getAllArtisans, getAllArtisansPagination, getPortfolioByAccountId, getPortfolioByArtisanId, updateArtisanStatus, updatePortfolioArtisanId } from '~/controllers/artisan.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanStatusUpdateSchema, artisanUpdatePortfolioSchema, } from '~/schemas/artisan';


const router = Router();

router.get('/pagination', getAllArtisansPagination)
router.get('/all', getAllArtisans)
router.get('/:artisanId', artisanDetailByArtisanId)
router.get('/detail/:accountId', artisanDetailByAccountId)
router.get('/application-status/:accountId', artisanApplicationStatus)
router.get('/account-portfolio/:accountId', getPortfolioByAccountId)
router.get('/artisan-portfolio/:artisanId', getPortfolioByArtisanId)

router.put('/toggle-status', updateArtisanStatus)
router.post('/status', validate(artisanStatusUpdateSchema), updatePortfolioArtisanId)
router.post('/portfolio', validate(artisanUpdatePortfolioSchema), updatePortfolioArtisanId)

export const artisanRouter = router;