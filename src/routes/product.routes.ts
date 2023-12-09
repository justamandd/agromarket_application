import express from "express";
import {
    createProduct,
    deleteProduct,
    findProduct,
    getAllProducts, listProductsByOrder,
    updateProduct
} from "../controllers/ProductController";

const productRouter = express.Router();

productRouter.post("/", createProduct)
productRouter.patch("/", updateProduct)
productRouter.get("/", getAllProducts)
productRouter.get("/:id", findProduct)
productRouter.delete("/", deleteProduct)
productRouter.get("/o/:id", listProductsByOrder)

export default productRouter;