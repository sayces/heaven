import express from "express";
import userController from "@/controllers/user/index";

const PORT = 5000;

const app = express();

app.get("/", (req, res) => res.send("welcome"));
app.get("/users", userController.getAll);
app.post("/users/create", userController.create);

app.listen(PORT, () => console.log("server started on PORT:", PORT));
