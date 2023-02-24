import express from "express";
const router = express.Router();

import {
    addNewSupplier,
    getAllSupplier,
    updateSupplier,
    deleteSupplier
} from "../controllers/SupplierController.js";

router.route("/").post(addNewSupplier).get(getAllSupplier);
router.route("/:id").delete(deleteSupplier).patch(updateSupplier);

export default router;