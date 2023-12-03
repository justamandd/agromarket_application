import express, {Request, Response, NextFunction} from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';
import routes from "./routes";

const prismaCliente = new PrismaClient();

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(routes)

app.get("/", async (req: Request, res: Response) => {
    res.send("Test");
})


app.listen(port, () => console.log(`The api is running on http://localhost:${port}/`));