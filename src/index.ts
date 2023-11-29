import express, { Express, Request, Response } from 'express';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
const app: Express = express();
// const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 4000;
import cors from 'cors';
import productRouter from './routes/productsRouter.js';
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
import userRouter from './routes/userRouter.js';

// const allowedOrigins = [
//   'https://portfolio-project-tau-eight.vercel.app',
//   'http://localhost:3000'
// ];
// const corsOptions = {
// 	origin: function (origin, callback) {
// 		if (allowedOrigins.indexOf(origin) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error('Not allowed by CORS'));
// 		}
// 	},
// 	credentials: true,
// 	headers: ['Content-Type']
// };

// app.use(cors(corsOptions));

// app.options('*', cors());

app.use(
  cors({
    origin: ['https://portfolio.naijason.tech/', 'http://localhost:3000'],
    credentials: true
  })
);

const corsConfig = {
  origin: true,
  credentials: true
};

app.options(
  ['https://portfolio.naijason.tech/', 'http://localhost:3000'],
  cors(corsConfig)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_req, res: Response) => {
  res.send('Up and running');
});
app.use('/products', productRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.listen(PORT, () => console.log('server running on port: ' + PORT));

// await migrate(db, { migrationsFolder: 'drizzle' });
// const mig = async () => {
// 	migrate(db, { migrationsFolder: 'drizzle' });
// };
// mig();
export default app;
