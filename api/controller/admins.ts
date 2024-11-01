import express from "express";
import database from "../config/db";

const router = express.Router()

router.get("/",async (req : express.Request , res : express.Response )=> {
    const data = await database.collection('user').find({}).toArray()
    res.send(data)
})

export default router