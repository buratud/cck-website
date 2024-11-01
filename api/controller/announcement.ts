import express from "express";
import database from "../config/db";
import { ObjectId } from "mongodb";
import validaccesstoken from "./middleware";
import multer from "multer";
import { randomUUID } from 'crypto';
import {renameSync } from 'fs'

const router = express.Router()

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './pictures/announcement')
        },
        filename(req, file, callback) {
            callback(null, file.originalname)
        },

    })
})

router.get("/:id",async (req : express.Request , res : express.Response) => {
    const params = req.params as unknown as string
    const activity = database.collection('announcement')
    const Objectid = new ObjectId(params)
    const query = {_id :Objectid }
    console.log(query);
    const data = await activity.findOne(query)
    console.log(data)
    res.send(data)
})




router.post("/", validaccesstoken, upload.array('file'), async (req: express.Request, res: express.Response) => {
    const { name, description = null } = req.body;
    const files = req.files as Express.Multer.File[]
    let listfile: String[] = []
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
    console.log(listfile)
    const query = { name, description, images: listfile }
    const announcement = database.collection('announcement')
    try {
        const data = await announcement.insertOne(query)
        res.status(201).send(data)
    }
    catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on : ${error}`)
     }
})

router.put("/:id", validaccesstoken, upload.array('file') ,async (req: express.Request, res: express.Response) => {
    const { name, description } = req.body
    const files = req.files as Express.Multer.File[]
    let listfile: String[] = []
    let Objectid ;
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
    const announcement = database.collection('announcement')
    try {
        const data = await announcement.updateOne(filter,update)
        res.status(200).send(data)
    }
    catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on : ${error}`)
     }
})


router.delete("/:id",validaccesstoken,async (req: express.Request, res: express.Response) => {
    const params = req.params as unknown as string
    let Objectid;
    try {
        Objectid = new ObjectId(params)
    }
    catch (error) {
        console.log(`error on ObjectId`);
        res.status(400).send(`error on ObjectId`)
        
    }
    const filter = { _id: Objectid }
    const announcement = database.collection('announcement')
    try {
        const data = await announcement.deleteOne(filter)
        res.status(200).send(data)
    }
    catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on : ${error}`)
     }
})

export default router

