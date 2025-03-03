import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import { sendErrorResponse } from './utils/response';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  sendErrorResponse(res, {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong',
  });
});

app.use((req, res) => {
  if (req.url === '/') {
    res.status(200).json({
      message: 'Hey welcome to  server',
    });
  }
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  });
});
export default app;
