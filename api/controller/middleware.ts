import * as jose from 'jose'
import express from 'express'
import 'dotenv/config'
import { logger } from './config';


const validaccesstoken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization as string;
    if (!authHeader) { 
        res.status(403).json({ error: 'No token provided' }); 
        return
    }
    const token = authHeader.split(' ').findLast(() => true);
    if (!token) {
        res.status(403).json({ error: 'Malformed token' });
        return
    }
    // check token by access
    const secret = new TextEncoder().encode(process.env.accesskey);
    try {
        const { payload } = await jose.jwtVerify(token, secret);
        logger.info(`Access token verified for ${payload.username}`);
        next();
    } catch (err) {
        logger.error(`JWT Verification failed: ${err}`);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}

export default validaccesstoken