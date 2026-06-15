import express from 'express'
import multer from 'multer'
import mime from 'mime-types'
import { nanoid } from 'nanoid'

const app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Verificamos datos? -> throw y atrapa el callback error
    // if(mime.extension(file.mimetype) !== 'pdf'){
    //     throw new Error('Extension incorrecta')
    // }
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const fileName = nanoid() + '.' + mime.extension(file.mimetype)
    cb(null, fileName)
  }
})

const upload = multer({
  // Destino?
    storage:storage
}).single('archivo')

app.use('/',express.static('./publico'))
app.use('/archivos',express.static('./files'))

app.post('/upload',(req, res)=>{
    upload(req, res, (err)=>{
        if(err){
            // Si hay un throw
            console.log(err)
            return res.sendStatus(500)
        }
        console.log(req.file)
        console.log(req.body)
        res.sendStatus(200)
    })
})

app.listen(3000)