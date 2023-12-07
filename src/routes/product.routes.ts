import express from "express";
import {
    createProduct,
    deleteProduct,
    findProduct,
    getAllProducts,
    updateProduct
} from "../controllers/ProductController";

const productRouter = express.Router();

productRouter.post("/create", createProduct)
productRouter.patch("/update", updateProduct)
productRouter.get("/", getAllProducts)
productRouter.get("/unique", findProduct)
productRouter.delete("/delete", deleteProduct)

export default productRouter;