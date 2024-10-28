import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";
import multer from "multer";
import { ObjectId } from "mongodb";


const router = express.Router()

const upload = multer({storage : multer.diskStorage({
    destination(req,file,cb){
        cb(null,'./pictures/member')
    },
    filename(req, file, callback) {
        callback(null,file.originalname)
    },

})})

router.put("/:id",validaccesstoken,upload.array('file'),async (req : express.Request,res :express.Response)=>{
    const { name, description } = req.body
    const files = req.files as unknown as File[]
    let listfile: String[] = [] as unknown as String[]
    if (files?.length != 0) {
        for (const data of files) {
            const name = data.destination + '/' + data.originalname
            listfile.push(name.slice(1))
        }
    }
    const params = req.params as unknown as string
    const Objectid = new ObjectId(params)
    const filter = { _id: Objectid }
    const update = {
        $set: {
            name,
            description,
            images: listfile
        }
    }
    const announcement = database.collection('member')
    try {
        const data = await announcement.updateOne(filter,update)
        res.status(200).send(data)
    }
    catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on : ${error}`)
     }
})




export default router