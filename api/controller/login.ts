import express  from "express";
import * as jose from 'jose'
import database from "../config/db";

const router = express.Router()


router.post("/",async (req : express.Request , res : express.Response) => {
    const {username,password} = req.body;
    const user = database.collection('user');
    const query = {username : username}
    const data = await user.findOne(query)
    if(!data){
        res.status(404).send({
            "message": "usernmae or password are incorrect"
        })
    } else {
        if (await Bun.password.verify(password,data.password)){
            const accesskey = new TextEncoder().encode(process.env.accesskey)
        const refreshkey = new TextEncoder().encode(process.env.refreshkey)
        const accessjwt = await new jose.SignJWT({
            "username" : username
        }).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime('2h').sign(accesskey)
        const refreshjwt = await new jose.SignJWT({
            "username" : username
        }).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime('1w').sign(refreshkey) 
        res.send({
            "accesskey":accessjwt,
            "refreshkey":refreshjwt
        })
        }
        else {
            res.status(404).send({
                "message": "usernmae or password are incorrect"
            })
        }
    }

})

export default router;