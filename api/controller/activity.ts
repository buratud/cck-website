import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";
import { ObjectId } from "mongodb";
import { Query } from "mongoose";

const router = express.Router()


router.get("",async (req : any , res : any )=> {
    const activity = database.collection('activity');
    const data =  await activity.find({}).toArray()
    res.send(data)
})


router.get("/:id",async (req : express.Request , res : express.Response) => {
    const params = req.params as unknown as string
    const activity = database.collection('activity')
    const Objectid = new ObjectId(params)
    const query = {_id :Objectid }
    console.log(query);
    const data = await activity.findOne(query)
    console.log(data)
    res.send(data)
})


router.post("",validaccesstoken,async (req : express.Request ,res : express.Response )=> {
    const {title, description, image} = req.body
    const query = {title,description,image}
    const activity = database.collection('activity');
    const data =  await activity.insertOne(query)
    res.status(201).send(data)
})

export default router