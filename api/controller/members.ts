import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";
import multer from "multer";
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


router.get("/",validaccesstoken,async (req: express.Request, res : express.Response)=> {
    const member = database.collection('member');
    const data = await member.find({}).toArray();
    res.send(data)

})

router.post("/",validaccesstoken,upload.array('file'),async (req : express.Request, res :express.Response) => {
    const {name,description = null} = req.body;
    const files = req.files as unknown as File[]
    let listfile :String[] = [] as unknown as String[]
    if (files?.length != 0){
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
    console.log(listfile)
    const query = {name,description,images:listfile}
    const member = database.collection('member')
    try {
        const data = await member.insertOne(query)
        res.status(201).send(data)
    }
    catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on : ${error}`)
     }
})


router.delete("/",async (req :express.Request , res : express.Response)=>{
    const member = database.collection('member')
    try {
        const data = await member.deleteMany({})
        res.send(data)
    }
    catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on ": ${error}`)
        
    }
} )

export default router