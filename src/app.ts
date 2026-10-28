import express from "express";
import UserController from "@/controllers/index";

const PORT = 5000;

const app = express();

app.get("/", (req, res) => res.send("welcome"));
app.get("/users", UserController.getAll);
app.post("/users/create", UserController.create);

app.listen(PORT, () => console.log("server started on PORT:", PORT));
