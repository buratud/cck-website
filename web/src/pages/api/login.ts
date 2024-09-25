import { secretKey, user_collection } from '@/config/db';
import type { NextApiRequest, NextApiResponse } from 'next'
import * as jose from 'jose'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      const { username, password } = req.body;
      const query = {"username" : username};
      const data = await user_collection.findOne(query);
      if (data == null){
        res.status(404).send({"message" : "username or password is incorrect"})
      }
      else {
        const match = await Bun.password.verify(password,data.passowrd)
        if (match) {
          const accessJWT = await new jose.SignJWT({"username" : data.username})
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('2h')
          .sign(secretKey);
        }
        else{
          res.status(404).send({"message" : "username or password is incorrect"})
        }
      }
      // const hash = await Bun.password.hash(password)
      // res.send(hash)
      
      break;
    default:
      res.status(404).send({"message" : "path not found"})
      break;
  }
} 