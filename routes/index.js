import axios from "axios";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/`);
        res.render("index.ejs", { content: response.data });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});


router.post("/", async (req, res) => {
    try {
        const type = req.body.type;
        const response = await axios.get(`https://v2.jokeapi.dev/joke/${type}`);
        res.render("index.ejs", { content: response.data });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.redirect('/');
    }
});

export default router;