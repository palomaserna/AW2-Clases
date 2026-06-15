
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';//preguntar
import bcrypt from 'bcryptjs';
import pool from './conexion.bd.mjs';
dotenv.config();


const PUERTO = process.env.PUERTO || 3000;
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', express.static('./fronts/front-login'));


app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.status(400).json({ 
         mensaje:'Se requieren usuario y contraseña'});
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hash]
        );
        if (resultado.rowCount > 0) {
            return res.redirect('/login');
        } else {
            return res.status(500).json({ 
            mensaje: 'Error al registrar el usuario' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
        mensaje: 'Error en el servidor' });
    }
});


app.post('/autenticar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.status(400).json({ 
            mensaje: 'Se requieren usuario y contraseña' });
    }
    try {
        const resultado = await pool.query(
            'SELECT password_hash FROM usuarios WHERE username = $1',
            [usuario]
        );
        if (resultado.rowCount === 0) {
            return res.status(401).json({
            mensaje: 'Usuario o contraseña incorrectos' });
        }
        const verificado = await bcrypt.compare(pass, resultado.rows[0].password_hash);
        if (!verificado) {
            return res.status(401).json({ 
            mensaje: 'Usuario o contraseña incorrectos' });
        }
        const sesionId = nanoid(21);
        await pool.query(
            'UPDATE usuarios SET session_id = $1 WHERE username = $2',
            [sesionId, usuario]
        );
        res.cookie('sessionId', sesionId, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge:  1000 * 20,
        });
        return res.redirect('/admin');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            mensaje: 'Error en el servidor' });
    }
});



function chequearAcceso(req, res, next) {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return res.redirect('/login');
    }
    pool.query(
        'SELECT session_id FROM usuarios WHERE session_id = $1',
        [sessionId]
    ).then((resultado) => {
        if (resultado.rowCount === 0) {
            return res.redirect('/login');
        }
        next();
    }).catch(() => {
        return res.redirect('/login');
    });
}


app.use('/admin', chequearAcceso, express.static('./fronts/front-admin'));

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
