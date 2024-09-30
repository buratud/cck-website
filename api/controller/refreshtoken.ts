import express from "express";
import * as jose from 'jose'

const router = express.Router()

router.post("", async (req: any, res: any) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(403).json({ msg: 'Unauthorized: Missing access token' })
        return
    }
    const token = authHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.refreshkey);
    try {
        const { payload } = await jose.jwtVerify(token, secret);
        console.log('Verified Payload:', payload);

        const accesskey = new TextEncoder().encode(process.env.accesskey)
        const refreshkey = new TextEncoder().encode(process.env.refreshkey)
        const accessjwt = await new jose.SignJWT({
            "username": payload.username
        }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime('2h').sign(accesskey)
        const refreshjwt = await new jose.SignJWT({
            "username": payload.username
        }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime('1w').sign(refreshkey)
        res.send({
            "accesskey": accessjwt,
            "refreshkey": refreshjwt
        })


    } catch (err) {
        console.error('JWT Verification failed:', err);
        res.status(500).send({
            "massage": "refresh error"
        })
    }
})


export default router
