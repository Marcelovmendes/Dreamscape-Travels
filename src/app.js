import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { addCity } from './controllers/cities.controller.js';
import cityRouter from './routes/cities.routes.js';
import accommodatioRouter from './routes/accommodation.routes.js';
import flightsRouter from './routes/fligths.routes.js';
import { addFlight } from './controllers/flights.controllers.js';
import { addAccomodattion } from './controllers/accommodation.controller.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(cityRouter)
app.use(accommodatioRouter)
app.use(flightsRouter)
dotenv.config()
//addCity();
//addFlight();
//addAccomodattion();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`);})
