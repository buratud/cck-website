import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";
import multer from "multer";
import { ObjectId } from "mongodb";
import { randomUUID } from 'crypto';
import {renameSync } from 'fs'


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
    let Objectid
    let listfile: String[] = [] as unknown as String[]
    if (files?.length != 0) {
        for (const data of files) {
            const uuid = randomUUID();
            const [name, extension] = data.originalname.split('.');
            const oldname = data.destination + '/' + data.originalname
            const newname = data.destination + '/' + name + uuid + "." + extension
            console.log(oldname);
            console.log(newname);
            renameSync(oldname,newname)
            listfile.push(newname.slice(1))
        }
    }
    const params = req.params as unknown as string
    try {
        Objectid = new ObjectId(params)
    }
    catch (error) {
        console.log(`error on ObjectId`);
        res.status(400).send(`error on ObjectId`)
        
    }
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