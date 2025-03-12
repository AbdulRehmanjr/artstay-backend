import { Router } from 'express';
import { allArtisans, artisanDetailByAccountId, artisanDetailByArtisanId, getPortfolioByArtisanId, updatePortfolioArtisanId } from '~/controllers/artisan.controller';
import { validate } from '~/middlewares/zod.middleware';
import { artisanUpdatePortfolioSchma } from '~/schemas/artisan';


const router = Router();

router.get('/all', allArtisans)
router.get('/:artisanId', artisanDetailByArtisanId)
router.get('/detail/:accountId', artisanDetailByAccountId)

router.get('/portfolio/:artisanId', getPortfolioByArtisanId)
router.post('/portfolio', validate(artisanUpdatePortfolioSchma), updatePortfolioArtisanId)

export const artisanRouter = router;