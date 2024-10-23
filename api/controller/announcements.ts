import express from "express";
import database from "../config/db";

const router = express.Router()

router.get("",async (req : any , res : any )=> {
    const data = await database.collection('announcement').find({}).toArray()
    res.send(data)
})

export default router