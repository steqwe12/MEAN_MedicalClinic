import express, { Router } from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes';
import path =require('path');

const app = express();

const exp = require("express");
const cor = require("cors");
const bodyPar = require("body-parser");
const multer = require('multer');
app.use(cor({origin:"*"}));
app.use(bodyPar.json());



app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/PIAPROJEKAT")
mongoose.connection.once('open', () => {
    console.log("db connection ok")
})


const router = Router()
app.use('/uploads', express.static(path.join('uploads')));
    
router.use('/user', userRouter)
app.use('/', router)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));


const storage = multer.diskStorage({   
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null,file.originalname)
    }
    
});

var upload = multer ({ storage: storage })

app.post('/file', upload.single('file'), (req, res) => {
   const file = req.body.file;
   // console.log(file.filename)
   res.send(file)
})

module.exports = router;