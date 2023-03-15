import { Router } from "express";
import foodController from "../controller/foodController";
import { auth } from "../middleware/auth";
export const foodRouter = Router();
// homeRouter.use(auth);
foodRouter.get("/merchants", foodController.getAllFood);
foodRouter.get("/", foodController.getAll);
foodRouter.get('/find-by-nameFood/:id',foodController.findFoodByName);
foodRouter.post('/find-by-nameFood',foodController.findFoodByName);
foodRouter.get("/my-foods/:idMerchant", foodController.getMyFood);
foodRouter.post("", foodController.createFood);
foodRouter.put("/:idFood", foodController.update);
foodRouter.delete("/:idFood", foodController.destroy);
foodRouter.get("/find-by-id/:idFood",foodController.find);

