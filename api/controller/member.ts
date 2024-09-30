import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";


const router = express.Router()

router.get("/",async (req: express.Request, res : express.Response)=> {
    const member = database.collection('member');
    const data = await member.find({}).toArray();
    res.send(data)

})

router.post("/",validaccesstoken,async (req : express.Request, res :express.Response) => {
    const {image,name,description} = req.body;
    const query = {image,name,description}
    const member = database.collection("member")
    const data = await member.insertOne(query)
    res.send(data)
})


export default router