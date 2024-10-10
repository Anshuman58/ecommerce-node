import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { Prisma, PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
import { SignupSchema } from "./schema/user";

const app = express();

app.use(express.json());

app.use("/api", rootRouter);

const prismaClient = new PrismaClient({
  log: ["query"],
});

// console.log(prismaClient);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App is listining on port ${PORT}`);
});
