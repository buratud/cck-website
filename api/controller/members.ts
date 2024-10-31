import express from "express";
import database from "../config/db";
import validaccesstoken from "./middleware";
import multer from "multer";


const router = express.Router()


const upload = multer({storage : multer.diskStorage({
    destination(req,file,cb){
        cb(null,'./pictures/member')
    },
    filename(req, file, callback) {
        callback(null,file.originalname)
    },

})})


router.get("/",validaccesstoken,async (req: express.Request, res : express.Response)=> {
    const member = database.collection('member');
    const data = await member.find({}).toArray();
    res.send(data)

})

router.post("/",validaccesstoken,upload.array('file'),async (req : express.Request, res :express.Response) => {
    const {name,description = null} = req.body;
    const files = req.files as unknown as File[]
    let listfile :String[] = [] as unknown as String[]
    if (files?.length != 0){
        for(const data of files){
            const name = data.destination+'/'+data.originalname
            listfile.push(name.slice(1))
        }
    }
    console.log(listfile)
    const query = {name,description,images:listfile}
    const member = database.collection('member')
    try {
        const data = await member.insertOne(query)
        res.status(200).send(data)
    }
    catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on : ${error}`)
     }
})


router.delete("/",async (req :express.Request , res : express.Response)=>{
    console.log("delete");
    // delete all member 
    const member = database.collection('member')
    try {
        const data = await member.deleteMany({})
        res.send(data)
    }
    catch (error) {
        console.log(`error on : ${error}`);
        res.status(500).send(`error on ": ${error}`)
        
    }
} )

export default router