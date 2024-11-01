import express from "express";
import database from "../config/db";

const router = express.Router()

router.get("/", async (req: any, res: any) => {
    try {
        const data = await database.collection('announcement').find({}).toArray()
        res.send(data)
    }
    catch(error) {
        console.log(`error on ${error}`);
        res.status(500).send(`error on ${error}`)
    }
})

export default router