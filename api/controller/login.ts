import express from "express";
import * as jose from 'jose'
import database from "../config/db";

const router = express.Router()


router.post("/", async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    const user = database.collection('user');
    const query = { username: username }
    const data = await user.findOne(query)
    if (!data) {
        res.status(404).send({
            "error": "invalid username or password"
        })
    } else {
        if (await Bun.password.verify(password, data.password)) {
            const accesskey = new TextEncoder().encode(process.env.accesskey)
            const refreshkey = new TextEncoder().encode(process.env.refreshkey)
            const accessToken = await new jose.SignJWT({
                "username": username
            }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime('2h').sign(accesskey)
            const refreshToken = await new jose.SignJWT({
                "username": username
            }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime('1w').sign(refreshkey)
            res.send({
                "access_token": accessToken,
                "refresh_token": refreshToken
            })
        }
        else {
            res.status(404).send({
                "error": "invalid username or password"
            })
        }
    }

})

export default router;