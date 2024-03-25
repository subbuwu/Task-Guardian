import { Router } from "express";
import { deleteMyTask, seeUserTasks, updateMyTask } from "../controllers/userController.js";
import { attachTypeOfUser } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/mytasks",attachTypeOfUser,seeUserTasks)
router.put("/updateMyTask",attachTypeOfUser,updateMyTask)
router.delete("/deleteMyTask",attachTypeOfUser,deleteMyTask)


export default router;