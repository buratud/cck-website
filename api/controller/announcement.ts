import express from "express";
import database from "../config/db";
import { ObjectId } from "mongodb";
import validaccesstoken from "./middleware";
import multer from "multer";
import { file } from "bun";

const router = express.Router()

const upload = multer({storage : multer.diskStorage({
    destination(req,file,cb){
        cb(null,'./pictures/announcement')
    },
    filename(req, file, callback) {
        callback(null,file.originalname)
    },

})})

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


router.post("",validaccesstoken,upload.array('file'),async (req : any ,res : any )=> {
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
    const announcement = database.collection('announcement')
    const data = await announcement.insertOne(query)
    res.send(data)
})

export default router