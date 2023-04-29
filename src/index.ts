import express, { Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

import { dataSource } from './db/data-source';
import { routes } from './routes';

dataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization: ', err);
    });

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use('/', routes);

app.get('/', (_, res: Response) => res.status(200).send());

app.listen(process.env.PORT || 5050, () => console.log(`Running on port ${process.env.PORT}`));
