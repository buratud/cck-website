import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";
import { ObjectId } from "mongodb";
import multer from "multer";
import { randomUUID } from 'crypto';
import { renameSync } from 'fs'
import { logger } from "./config";
import path from 'path';
import fs from 'fs';

const router = express.Router()

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) { cb(null, './static/activity') },
        filename(req, file, callback) { callback(null, file.originalname) },
    })
})


router.get("/:id", async (req: express.Request, res: express.Response) => {
    const { id } = req.params
    const col = database.collection('activity')
    let Objectid;
    try {
        Objectid = new ObjectId(id)
    } catch (error) {
        res.status(400).send({ error: `${error}` })
    }
    const query = { _id: Objectid }
    logger.debug(`Query : ${query}`)
    const data = await col.findOne(query)
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
    logger.debug(`List file : ${listfile}`);
    const query = { name, description, images: listfile }
    const col = database.collection('activity')
    try {
        const data = await col.insertOne(query)
        res.status(201).send({ "message": "OK", "id": data.insertedId })
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(500).send({ "error": `${error}` })
    }
})

router.put("/:id", validaccesstoken, upload.array('file'), async (req: express.Request, res: express.Response) => {
    const { name, description } = req.body
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
    const { id } = req.params
    let Objectid;
    try {
        Objectid = new ObjectId(id)
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(400).send({ "error": `${error}` })
    }
    const filter = { _id: Objectid }
    const update = {
        $set: {
            name,
            description,
            images: listfile
        }
    }
    const announcement = database.collection('activity')
    try {
        const data = await announcement.updateOne(filter, update)
        if (data.matchedCount === 1) {
            res.status(200).send({ "message": "OK" })
        } else {
            res.status(404).send({ "error": "not Found" })
        }
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(500).send({ "error": `${error}` })
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
        res.status(400).send({ "error": `${error}` })
    }
    const filter = { _id: Objectid }
    const announcement = database.collection('activity')
    try {
        const data = await announcement.deleteOne(filter)
        res.status(204).send()
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(500).send({ "error": `${error}` })
    }
})

export default router