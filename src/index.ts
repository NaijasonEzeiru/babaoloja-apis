import express, { Express, Request, Response } from 'express';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
const app: Express = express();
// const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 4000;
import cors from 'cors';
import productRouter from './routes/productsRouter.js';
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
// import userRouter from './routes/userRouter.js';

import { db } from './db/db.js';

// app.use(cors(corsOptions));
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_req, res: Response) => {
	res.send('Up and running');
});
app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
// app.use('/user', userRouter);
app.listen(PORT, () => console.log('server running on port: ' + PORT));

await migrate(db, { migrationsFolder: 'drizzle' });

export default app;
