import express from 'express';
import { env } from '~/env';
import cookieParser from 'cookie-parser';
import { morganMiddleware } from '~/middlewares/morgan.middleware';
import { mainRouter } from '~/routers/index.routes';
import cors from 'cors';
//* declaration of variables 
const app = express();
const port = env.PORT || 3000;

// * middlewares
app.use(morganMiddleware);
app.use(cookieParser(env.COOKIE_SECRET));
app.use(cors());
app.use(express.json());
app.use('/api/v1',mainRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});