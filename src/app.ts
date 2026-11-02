import express from "express";
import rootRouter from "./router";

const PORT = 5000;
const app = express();

app.use("/api", rootRouter);
app.use(express.json());

app.listen(PORT, () => console.log("server started on PORT:", PORT));
