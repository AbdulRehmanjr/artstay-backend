import { Router } from 'express';
import { artisanRouter } from '~/routes/artisan.routes';
import { accountRouter } from '~/routes/account.routes';
import { craftRouter } from '~/routes/craft.routes';
import { packageRouter } from '~/routes/package.routes';
import { registerRouter } from '~/routes/register.routes';
import { safariRouter } from '~/routes/safari.routes';
import { fairRouter } from '~/routes/fair.routes';
import { shopRouter } from '~/routes/shop.routes';
import { diningRouter } from '~/routes/dining.routes';
import { travelRouter } from '~/routes/travel.routes';
import { propertyRouter } from '~/routes/property.routes';

const router = Router();

router.use('/register', registerRouter)
router.use('/artisan', artisanRouter);
router.use('/account', accountRouter);
router.use('/craft', craftRouter)
router.use('/package', packageRouter)
router.use('/safari', safariRouter)
router.use('/fair', fairRouter)
router.use('/shop', shopRouter)
router.use('/dining', diningRouter)
router.use('/travel', travelRouter)
router.use('/property', propertyRouter)
export const mainRouter = router;