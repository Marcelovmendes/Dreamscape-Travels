import { Router} from "express";
import {  getCities } from "../controllers/cities.controller.js";

const cityRouter = Router();

cityRouter.get("/", getCities);
 
export default cityRouter;
