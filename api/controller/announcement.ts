import express from "express";
import database from "../config/db";
import { ObjectId } from "mongodb";
import validaccesstoken from "./middleware";

const router = express.Router()

router.get("",async (req : any , res : any )=> {
    const data = await database.collection('announcement').find({}).toArray()
    res.send(data)
})


router.get("/:id",async (req : any , res : any) => {
    const params = req.params as unknown as string
    const activity = database.collection('announcement')
    const Objectid = new ObjectId(params)
    const query = {_id :Objectid }
    console.log(query);
    const data = await activity.findOne(query)
    console.log(data)
    res.send(data)
})


router.post("",validaccesstoken,async (req : any ,res : any )=> {
    const {title,description,image} = req.body
    const query = {title,description,image}
    const announcement = database.collection('announcement')
    const data = await announcement.insertOne(query)
    // add data into database
    res.status(201).send("add data success")
})

export default router