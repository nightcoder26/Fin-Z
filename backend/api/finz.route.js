import express from "express";

const router = express.Router();

router.route("/").get((req, res) => res.send("Hello World!"));
router.route("/home").get((req, res) => res.send("Hello Home!"));

export default router;
