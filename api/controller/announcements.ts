import express from "express";
import database from "../config/db";
import { logger } from "./config";

const router = express.Router()

router.get("/", async (req: any, res: any) => {
    try {
        const data = await database.collection('announcement').find().toArray()
        res.send(data)
    }
    catch(error) {
        logger.error(`${error}`);
        res.status(500).send(`${error}`)
    }
})

export default router