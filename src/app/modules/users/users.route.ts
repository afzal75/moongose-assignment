import  express  from "express"
import { UserController } from "./users.controller";

const router = express.Router();

router.post("/", UserController.createUsers);
router.get("/", UserController.getAllUsers)
router.get("/:userId", UserController.getSingleUser)
router.put("/:userId", UserController.updateSingleUser)
router.put("/:userId/orders", UserController.updateOrderSingleUser)
router.get("/:userId/orders", UserController.getSingleOrder)
router.get("/:userId/orders/total-price", UserController.getTotalPriceOrder)
router.delete("/:userId", UserController.deleteSingleUser)

export const UserRouter  = router;