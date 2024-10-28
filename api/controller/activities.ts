import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";
import { ObjectId } from "mongodb";
import { Query } from "mongoose";
import multer from "multer";

const router = express.Router()

router.get("",async (req : any , res : any )=> {
    const activity = database.collection('activity');
    const data =  await activity.find({}).toArray()
    res.send(data)
})

export default router