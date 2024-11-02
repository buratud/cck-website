import express from "express";
import database from "../config/db";
import { password } from "bun";

const router = express.Router()

router.get("/",async (req : express.Request , res : express.Response )=> {
    const data = await database.collection('user').find({}, {projection: {password: 0}}).toArray()
    res.send(data)
})

export default router