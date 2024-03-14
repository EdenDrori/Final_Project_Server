import express, { json } from "express";
import { notFound } from "./middleware/not-found";
import { usersRouter } from "./routes/users";
import { connect } from "./database/connection";
import { errorHandler } from "./middleware/error-handler";
import morgan from "morgan";
import cors from "cors";
import { itemsRouter } from "./routes/items";
import { configDotEnv } from "./config";
import { contactRouter } from "./routes/contact";

configDotEnv();
connect();

const app = express();
app.use(cors());

app.use(express.static("public"));
app.use(json());
app.use(morgan("dev"));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/items", itemsRouter);
app.use("/api/v1/contact", contactRouter);
app.use(errorHandler);
app.use(notFound);

app.listen(8081);
