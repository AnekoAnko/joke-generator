import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});