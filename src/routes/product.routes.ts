import express from "express";
import {
    createProduct,
    deleteProduct,
    findProduct,
    getAllProducts,
    updateProduct
} from "../controllers/ProductController";

const productRouter = express.Router();

productRouter.post("/", createProduct)
productRouter.patch("/", updateProduct)
productRouter.get("/", getAllProducts)
productRouter.get("/:id", findProduct)
productRouter.delete("/", deleteProduct)

export default productRouter;