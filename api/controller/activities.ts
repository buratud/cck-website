import express from "express";
import database from "../config/db";

const router = express.Router()

router.get("/", async (req: any, res: any) => {
    const activity = database.collection('activity');
    const data = await activity.find().toArray()
    res.send(data)
})

export default router