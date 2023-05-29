import { Router } from "express";
import { getAccommodationByPrice } from "../controllers/accommodation.controller.js";

const acommodatioRouter = Router();

acommodatioRouter.get("/accommodations", getAccommodationByPrice);

export default acommodatioRouter;
