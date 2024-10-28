import express from "express";
import database from "../config/db";
import { ObjectId } from "mongodb";
import validaccesstoken from "./middleware";
import multer from "multer";

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




router.post("", validaccesstoken, upload.array('file'), async (req: express.Request, res: express.Response) => {
    const { name, description = null } = req.body;
    const files = req.files as unknown as File[]
    let listfile: String[] = [] as unknown as String[]
    if (files?.length != 0) {
        for (const data of files) {
            const name = data.destination + '/' + data.originalname
            listfile.push(name.slice(1))
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

router.put("/:id", validaccesstoken, async (req: express.Request, res: express.Response) => {
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
    const Objectid = new ObjectId(params)
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