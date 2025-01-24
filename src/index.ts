import express from 'express';
import { env } from '~/env';

const app = express();
const port = env.PORT || 3000;
import cookieParser from 'cookie-parser';


app.use(cookieParser(env.COOKIE_SECRET));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});