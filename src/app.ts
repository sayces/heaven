import express from "express";
import { rootRouter } from "./router";

const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api", rootRouter);

app.listen(PORT, () => console.log("server started on PORT:", PORT));
