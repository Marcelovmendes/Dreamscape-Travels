import { Router} from "express";
import {  getAllCities, searchCities } from "../controllers/cities.controller.js";

const cityRouter = Router();

cityRouter.get("/",getAllCities );
cityRouter.get("/search", searchCities)
 
export default cityRouter;
