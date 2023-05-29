import {Router} from "express";
import { getAllFlights, getFlightById, getFlightsByPrice } from "../controllers/flights.controllers.js";



const flightsRouter = Router();

flightsRouter.get("/flights",getFlightsByPrice);
flightsRouter.get("/flights/:id", getFlightById)
flightsRouter.get("/flights", getAllFlights)
export default flightsRouter