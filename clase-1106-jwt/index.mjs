// Token de acceso TID AW2 p.366

import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './conexion.bd.mjs';
import jwt from 'jsonwebtoken'
//Inyectar las variales de entorno al proceso
dotenv.config();

const PUERTO = process.env.PUERTO || 4000;

const app = express();
//parsean y lo guardan en body como objeto java
app.use(express.json());
app.use(express.urlencoded({extended:true}))//

//lee la cabecera de las cookies y crea un objeto cookies q los 
// transforma a un objeto java y si esta firmada lo pone en signedCookies 
app.use(cookieParser(process.env.JWT_COOKIE));

app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashingPass = bcrypt.hashSync(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );
        if (resultado.rowCount > 0) {
            res.redirect('/login'); // Redirigimos al usuario a la página de login
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
app.post('/autenticar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
   //consultar a la bd si el user esta registrado
   if(true){
    jwt.sign({usuario:'palo'},process.env.JWT_FIRMA,{expiresIn:'1h'},(error, token)=>{
        if(error){
            return res.json({mensaje:'error'})
        }
        //enviamos cookie
        res.cookie('token',token,{
            secure:true,
            httpOnly:true,
            sameSite:'lax',
            signed:true
        })
        res.redirect('/admin')
        
    })
    
   }
});

function verificarAcceso(req,res,next){
jwt.verify(token, 'largaysupersecreta', function (error, decoded){
    const token=req.signedCookies ['token' ]
    if (error){
        return res.redirect('/login')
    }
    next()
})
}
//Servir ambos fronts 
app.use('/admin',verificarAcceso,express.static('./fronts/front-admin'))
app.use('/login',express.static('./fronts/front-login'))

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
