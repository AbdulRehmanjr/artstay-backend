import { Router } from 'express';
import { artisanRouter } from '~/routers/artisan.routes';
import { accountRouter } from '~/routers/account.routes';
import { craftRouter } from '~/routers/craft.routes';
import { packageRouter } from '~/routers/package.routes';
import { registerRouter } from '~/routers/register.routes';
import { safariRouter } from '~/routers/safari.routes';

const router = Router();

router.use('/register',registerRouter)
router.use('/artisan',artisanRouter);
router.use('/account',accountRouter);
router.use('/craft',craftRouter)
router.use('/package',packageRouter)
router.use('/safari',safariRouter)

export const mainRouter = router;