import express from "express";
import * as jose from 'jose'

const router = express.Router()

router.post("", async (req: any, res: any) => {
    const authHeader = req.headers.authorization
    if (!authHeader) { res.status(403).json({ msg: 'Unauthorized: Missing access token' }) }
    const token = authHeader.split(' ')[1];
    const secret = new TextEncoder().encode(process.env.refreshkey);
    try {
        const { payload } = await jose.jwtVerify(token, secret);
        console.log('Verified Payload:', payload);
        res.send(payload)
    } catch (err) {
        console.error('JWT Verification failed:', err);
        res.status(500).send({
            "massage": "refresh error"
        })
    }
})


export default router
