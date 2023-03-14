import { Router } from "express";
import foodController from "../controller/foodController";
import { auth } from "../middleware/auth";
export const foodRouter = Router();
// homeRouter.use(auth);
foodRouter.get("/merchants", foodController.getAllFood);
foodRouter.get('/find-by-nameFood',foodController.findFoodByName);
foodRouter.get("/my-foods", foodController.getMyFood);
foodRouter.post("", foodController.createFood);
foodRouter.put("/:idFood", foodController.update);
foodRouter.delete("/:idFood", foodController.destroy);
foodRouter.get("/find-by-id/:idFood",foodController.find);

