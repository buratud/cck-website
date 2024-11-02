import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";
import { ObjectId } from "mongodb";
import { Admin, AdminIdentifier } from "../domains/admins";
import { logger } from "./config";

const router = express.Router()

router.post("/", validaccesstoken, async (req: express.Request, res: express.Response) => {
    const result = Admin.safeParse(req.body)
    if (!result.success) {
        res.status(400).send({ error: result.error })
        return
    }
    if (result.data.password.length === 0) {
        res.status(400).send({ error: "password cannot be empty" })
        return
    }
    result.data.password = Bun.password.hashSync(result.data.password)
    const col = database.collection('user')
    try {
        const data = await col.insertOne(result.data)
        res.status(201).send({ message: "OK" })
    } catch (error) {
        logger.error(`${error}`);
        res.status(500).send({ error: `${error}` })
    }
})

router.put("/:id", validaccesstoken, async (req: express.Request, res: express.Response) => {
    let id: ObjectId
    try {
        id = new ObjectId(req.params.id)
    } catch (error) {
        res.status(400).send({ error: "invalid id" })
        return
    }
    const result = AdminIdentifier.safeParse(req.body)
    if (!result.success) {
        res.status(400).send({ error: result.error })
        return
    }
    if (result.data.password !== undefined) {
        if (result.data.password.length === 0) {
            res.status(400).send({ error: "password cannot be empty" })
            return
        }
        result.data.password = Bun.password.hashSync(result.data.password)
    }
    const col = database.collection('user')
    try {
        const updateResult =  await col.updateOne({ _id: id }, { $set: result.data })
        if (updateResult.matchedCount === 0) {
            res.status(404).send({ error: "id not found" })
            return
        } else {
            res.status(200).send({ message: "OK" })
        }
    } catch (error) {
        logger.error(`${error}`);
        res.status(500).send({ error: `${error}` })
    }
})

router.delete("/:id", validaccesstoken, async (req: express.Request, res: express.Response) => {
    let id: ObjectId
    try {
        id = new ObjectId(req.params.id)
    } catch (error) {
        res.status(400).send({ error: "invalid id" })
        return
    }
    const col = database.collection('user')
    try {
        await col.deleteOne({ _id: id })
        res.status(204).send()
    } catch (error) {
        logger.error(`${error}`);
        res.status(500).send({ error: `${error}` })
    }
})

export default router