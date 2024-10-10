import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";
import { ObjectId } from "mongodb";
import { Query } from "mongoose";
import multer from "multer";

const router = express.Router()

const upload = multer({storage : multer.diskStorage({
    destination(req,file,cb){
        cb(null,'./pictures/activity')
    },
    filename(req, file, callback) {
        callback(null,file.originalname)
    },

})})


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


router.post("",validaccesstoken,upload.array('file'),async (req : express.Request ,res : express.Response )=> {
    const {name,description = null} = req.body;
    const files = req.files as unknown as File[]
    let listfile :String[] = [] as unknown as String[]
    if (files?.length != 0){
        for(const data of files){
            const name = data.destination+'/'+data.originalname
            listfile.push(name.slice(1))
        }
    }
    console.log(listfile)
    const query = {name,description,images:listfile}
    const activity = database.collection('activity')
    const data = await activity.insertOne(query)
    res.send(data)
})




export default router