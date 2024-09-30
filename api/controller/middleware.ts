import * as jose from 'jose'
import express from 'express'
import 'dotenv/config'


const validaccesstoken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization as string;
    if (!authHeader) { 
        res.status(403).json({ msg: 'Unauthorized: Missing access token' }) 
        return
    }
    const token = authHeader.split(' ')[1];
    // check token by access
    const secret = new TextEncoder().encode(process.env.accesskey);
    try {
        const { payload } = await jose.jwtVerify(token, secret);
        console.log('Verified Payload:', payload);
        next();
    } catch (err) {
        console.error('JWT Verification failed:', err);
    }
}

export default validaccesstoken