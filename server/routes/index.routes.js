import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.json({ message: "welcome to server" }));

export default router;
