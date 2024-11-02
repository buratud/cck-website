import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";
import multer from "multer";
import { randomUUID } from 'crypto';
import { renameSync } from 'fs'
import { MemberArray, MemberIdentifier, MemberIdentifierArray, type MemberType } from "../domains/members";
import { logger } from "./config";

const router = express.Router()

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) { cb(null, './static/member') },
        filename(req, file, callback) { callback(null, file.originalname) },
    })
})

router.get("/", validaccesstoken, async (req: express.Request, res: express.Response) => {
    const member = database.collection('member');
    const data = await member.find().toArray();
    res.send(data)
})

router.post("/", validaccesstoken, upload.array('file'), async (req: express.Request, res: express.Response) => {
    if (!(req.body instanceof Array)) {
        res.status(400).send({ error: "Invalid request" })
        return
    }
    const result = MemberArray.safeParse(req.body)
    if (!result.success) {
        res.status(400).send({ error: result.error })
        return
    }
    if (result.data.length === 0) {
        res.status(400).send({ error: "empty request" })
        return
    }
    const col = database.collection('member')
    try {
        const data = await col.insertMany(result.data)
        res.status(201).send({ message: "OK", ids: data.insertedIds })
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(500).send({ error: `${error}` })
    }
})

router.put("/", validaccesstoken, async (req: express.Request, res: express.Response) => {
    if (!(req.body instanceof Array)) {
        res.status(400).send({ error: "Invalid request" })
        return
    }
    const result = MemberArray.safeParse(req.body)
    if (!result.success) {
        res.status(400).send({ error: result.error })
        return
    }
    const col = database.collection('member')
    try {
        for (const item of result.data) {
            await col.updateOne({ id: item.id }, { $set: item })
        }
        res.status(200).send({ message: "OK" })
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(500).send({ error: `${error}` })
    }
})

router.delete("/", async (req: express.Request, res: express.Response) => {
    const result = MemberIdentifierArray.safeParse(req.body)
    if (!result.success) {
        res.status(400).send({ error: result.error })
        return
    }
    const col = database.collection('member')
    try {
        for (const item of result.data) {
            await col.deleteOne(item)
        }
        res.status(204).send()
    }
    catch (error) {
        logger.error(`${error}`);
        res.status(500).send({ error: `${error}` })
    }
})

export default router