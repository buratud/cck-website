import express from "express";
import database from "../config/db";
import { password } from "bun";
import validaccesstoken from "./middleware";
import { ObjectId } from "mongodb";

const router = express.Router()

router.post("", validaccesstoken, async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body
    const hashed = await Bun.password.hash(password)
    const query = { username, password: hashed }
    try {
        const data = await database.collection('user').insertOne(query)
        res.send(data)
    } catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on : ${error}`)
    }
})

router.put("/:id", validaccesstoken, async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body
    const user = database.collection('user')
    const params = req.params as unknown as string
    const Objectid = new ObjectId(params)
    const hashed = await Bun.password.hash(password)
    const filter = { _id: Objectid }
    const update = {
        $set: {
            username, password: hashed
        }
    }
    try {
        const data = await user.updateOne(filter, update)
        res.status(200).send(data)
    }
    catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on : ${error}`)
    }

})

router.delete("/", validaccesstoken, async (req: express.Request, res: express.Response) => {
    console.log("delete admin");

    const { username } = req.body;
    const user = database.collection('user')
    try {
        const checkuser = await user.findOne({ username })
        if (checkuser === null) {
            res.send(404).send("this username not found ")
        }
        else {
            const data = await user.deleteOne({ username })
            res.status(200).send("delete user success")
        }

    }
    catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on : ${error}`)

    }
})

export default router