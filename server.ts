import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import next from 'next';
import mongoose from 'mongoose';

config();

(async () => {
  const port = parseInt(process.env.PORT || '8080', 10);
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });
  const handle = app.getRequestHandler();

  try {
    await mongoose.connect(process.env.MONGO_URL || ''/*, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }*/);
    console.log('Connected to DB !!');

    await app.prepare();
    const server = express();

    server.all('/healthcheck', (req: Request, res: Response) => res.status(200).send('Healthy'));

    server.all('*', (req: Request, res: Response) => handle(req, res));

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }

})().catch((error) => {
  console.log('server error', error);
});