import * as jose from 'jose'
import 'dotenv/config'


const validaccesstoken = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization
    if (!authHeader) { res.status(403).json({ msg: 'Unauthorized: Missing access token' }) }
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