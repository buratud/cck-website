import express from "express";
import database from "../config/db";
import { ObjectId } from "mongodb";
import validaccesstoken from "./middleware";
import multer from "multer";
import { randomUUID } from 'crypto';
import { renameSync } from 'fs'
import { logger } from "./config";
import path from 'path';
import fs from 'fs';

const router = express.Router()

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './static/announcement')
        },
        filename(req, file, callback) {
            callback(null, file.originalname)
        },
    })
})

router.get("/:id", async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const activity = database.collection('announcement')
    let objectId;
    try {
        objectId = new ObjectId(id)
    } catch (error) {
        logger.error(`${error}`);
        res.status(400).send({ error: `${error}` })
    }
    const query = { _id: objectId }
    logger.debug(`Query : ${query}`)
    const data = await activity.findOne(query)
    logger.trace(`Data : ${data}`)
    if (data) {
        res.send(data)
    } else {
        res.status(404).send({ "error": "not Found" })
    }
})

router.post("/", validaccesstoken, upload.array('file'), async (req: express.Request, res: express.Response) => {
    const { name, description = null } = req.body;
    const files = req.files as Express.Multer.File[]

    let listfile: String[] = []
    for (const file of files) {
        const uuid = randomUUID();
        const filenameWithExt = path.parse(file.originalname)
        const filename = filenameWithExt.name
        const ext = filenameWithExt.ext
        const oldPath = `${file.destination}/${file.originalname}`
        const newPath = `${file.destination}/${filename}_${uuid}${ext}`
        logger.debug(`Old path : ${oldPath}`);
        logger.debug(`New path : ${newPath}`);
        renameSync(oldPath, newPath)
        listfile.push(newPath.slice(1))
    }

    logger.debug(`List file : ${listfile}`)

    const query = { name, description, images: listfile }
    const announcement = database.collection('announcement')
    try {
        const data = await announcement.insertOne(query)
        res.status(201).send({ "message": "OK", "id": data.insertedId })
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(500).send({ error: `${error}` })
    }
})

router.put("/:id", validaccesstoken, upload.array('file'), async (req: express.Request, res: express.Response) => {
    const { name, description, erased } : { name: string, description: string, erased: string } = req.body;
    const files = req.files as Express.Multer.File[]
    let listfile: string[] = []

    if (files?.length != 0) {
        for (const file of files) {
            const uuid = randomUUID();
            const filenameWithExt = path.parse(file.originalname)
            const filename = filenameWithExt.name
            const ext = filenameWithExt.ext
            const oldPath = `${file.destination}/${file.originalname}`
            const newPath = `${file.destination}/${filename}_${uuid}${ext}`
            logger.debug(`Old path : ${oldPath}`);
            logger.debug(`New path : ${newPath}`);
            renameSync(oldPath, newPath)
            listfile.push(newPath.slice(1))
        }
    }

    let Objectid;
    const { id } = req.params
    try {
        Objectid = new ObjectId(id)
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(400).send({ error: `${error}` })
    }

    const filter = { _id: Objectid }
    const update : { $set: { name: string, description: string, images?: string[] } } = {
        $set: {
            name,
            description,
        }
    } 

    if (listfile.length > 0) {
        update.$set.images = listfile
    }
    if (erased === "true") {
       update.$set.images = []
    }

    const announcement = database.collection('announcement')
    try {
        const data = await announcement.updateOne(filter, update)
        if (data.matchedCount == 0) {
            res.status(404).send({ "error": "not Found" })
        } else {
            res.status(200).send({ "message": "OK" })
        }
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(500).send(`${error}`)
    }
})


router.delete("/:id", validaccesstoken, async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    let Objectid;
    try {
        Objectid = new ObjectId(id)
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(400).send({ error: `${error}` })
    }
    const col = database.collection('announcement')

    const filter = { _id: Objectid }
    const data = await col.findOne(filter)
    if (data) {
        try {
            data.images.forEach((element: string) => { fs.unlinkSync(element) })
        } catch (error) {
            logger.error(`${error}`);
        }
    }

    await col.deleteOne(filter)
    res.status(204).send({ message: "no content" })
})

export default router

