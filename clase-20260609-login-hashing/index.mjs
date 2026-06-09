import express from 'express';
import bcrypt from 'bcryptjs'
import pool from './conexion.bd.mjs'

const PUERTO = 3000

////////////////

////////////////
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//hacer publicas las carpetas para acceder desde el navegador
// /admin y /login (peticion (./fronts/front-admin))
app.use('/admin',express.static('./fronts/front-admin'))

app.use('/login',express.static('./fronts/front-login'))

//configuracion rutas login y registro 
app.post('/autenticar', (req,res)=>{

})
app.post('/registrar', async(req,res)=>{
    //obtengo los datos del formulario
    const {usuario, pass} =  req.body
    //controlar datos
    if(!usuario || !pass){
       return res.status(400).json({
            mensaje: 'datos incompletos'
        })
    }
    //hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    
   const resultado= await pool.query(`
        INSERT INTO usuarios
            (username, password_hash)
        VALUES 
            ($1, $2)
        RETURNING id, username`,
        [ 
            usuario,
            hash
         ]
        )

    if(resultado.rowCount > 0){ 
        return res.status(201).json ({ mensaje:'usuario registrado', usuario:resultado.rows [0].username})
    }
    res.status(200).json({
        mensaje: 'no se pudo'
    })
})



app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
