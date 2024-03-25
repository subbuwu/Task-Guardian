import { Router } from "express";
import { createTaskAndAssign, deleteTask, fetchAllUsers, updateTask, updateUserRole } from "../controllers/admin-managerController.js";
import { attachTypeOfUser, checkRoleAndProceed } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/users",attachTypeOfUser,checkRoleAndProceed,fetchAllUsers)
router.post("/createTask",attachTypeOfUser,checkRoleAndProceed,createTaskAndAssign)
router.put("/updateTask",attachTypeOfUser,checkRoleAndProceed,updateTask)
router.delete("/deleteTask",attachTypeOfUser,checkRoleAndProceed,deleteTask)
router.put("/updateRole",attachTypeOfUser,checkRoleAndProceed,updateUserRole)

export default router;