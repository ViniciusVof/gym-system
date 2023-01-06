import express, { json, urlencoded } from 'express';
import cors from 'cors';
import routes from './routes.js';
const app = express();

app.use(cors());
app.use(json());
app.use(routes);

app.listen(port);