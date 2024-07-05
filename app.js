import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.use("/", router);

export default app;
