import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { addCity } from './controllers/cities.controller.js';
import cityRouter from './routes/cities.routes.js';
import acommodatioRouter from './routes/acommodation.routes.js';
import flightsRouter from './routes/fligths.routes.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(cityRouter)
app.use(acommodatioRouter)
app.use(flightsRouter)
dotenv.config()
//addCity();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`);})
