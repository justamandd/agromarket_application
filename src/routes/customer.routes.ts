import express from "express";
const customerRouter = express.Router();

customerRouter.get("/test", (req, res) => {
    res.send('test customer')
})



export default customerRouter;