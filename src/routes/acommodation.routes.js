import { Router } from "express";
import { getAcommodationByPrice } from "../controllers/acommodation.controller.js";

const acommodatioRouter = Router();

acommodatioRouter.get("/acommodations", getAcommodationByPrice);

export default acommodatioRouter;
