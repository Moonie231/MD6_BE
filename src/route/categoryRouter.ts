import {Router} from "express";
import foodController from "../controller/foodController";

export const categoryRouter = Router()
categoryRouter.get('/',foodController.findCategory);