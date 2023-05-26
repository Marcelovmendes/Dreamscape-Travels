import {Router} from "express";
import { getFlightById, getFlightsByPrice } from "../controllers/flights.controllers.js";



const flightsRouter = Router();

flightsRouter.get("/flights",getFlightsByPrice);
flightsRouter.get("/flights/:id", getFlightById)

export default flightsRouter