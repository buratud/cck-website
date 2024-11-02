import express from "express";
// Honestly why don't they do default exports?
import * as jose from 'jose'
import { logger } from "./config";

const router = express.Router()

router.post("", async (req: any, res: any) => {
    const { refresh_token: refreshToken }: { refresh_token: string } = req.body
    if (!refreshToken) {
        res.status(401).send({ "error": "no token provided" })
        return
    }
    // Find the token in the Authorization header from last one
    const token = refreshToken.split(' ').findLast(() => true);
    if (!token) {
        res.status(401).send({ "error": "malformed token" })
        return
    }
    const refreshKey = new TextEncoder().encode(process.env.refreshkey);
    const accessKey = new TextEncoder().encode(process.env.accesskey)
    try {
        const { payload } = await jose.jwtVerify(token, refreshKey);
        logger.info(`Refresh token verified for ${payload.username}`);

        const accessjwt = await new jose.SignJWT({
            "username": payload.username
        }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime('2h').sign(accessKey)
        res.send({
            "access_token": accessjwt
        })

    } catch (err) {
        logger.error('JWT Verification failed:', err);
        res.status(500).send({
            "error": "JWT Verification failed"
        })
    }
})

export default router
