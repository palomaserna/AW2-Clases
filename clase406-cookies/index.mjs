import express from 'express'
import cookieParser from 'cookie-parser'

const PUERTO = 3000

const app = express()

app.use(cookieParser('misecreto'))
// Avisamos que debe incluir los datos en body
app.use(express.json())
// Codificacion de URL
app.use(express.urlencoded({extended:true}))
// Front login
// /login
app.use('/login', express.static('./fronts/front-login'))
// front Admin
function chequearAcceso(req, res, next){
    const miidentificador = req.signedCookies['sesion']
    console.log(miidentificador)
    if(miidentificador === 'identificador'){
        return next()
    }
    return res.redirect('/login')
}
app.use('/admin',chequearAcceso, express.static('./fronts/front-admin'))

// Ruta autenticacion
app.post('/autenticar',(req, res)=>{
    // Primero -> verificar las credenciales
    const {usuario, clave} = req.body

    // Debe ser una consulta a la BD
    if(usuario != 'miusuario' || clave != '123456'){
        return res.redirect('/login')
    }
    // Gestionamos cookies
    // Generar cabeceras para gestion de cookies
    res.cookie('sesion','identificador',{
        secure: true, // https
        httpOnly: true, // no se puede leer desde JS
        sameSite: 'lax', // como se va a leer la cookie con respecto al dominio
        signed: true, // Si la cookie se va a firmar o no
        maxAge: 1000 * 20 //<----------en milisegundos
    })
    // Siempre la respuesta final
    // res.json(
    //     {
    //         mensaje: 'usuario logueado'
    //     }
    // )
    // Lo vamos a utilizar solo si en el fron es HTML puro
    res.redirect('/admin')
    // Si no es puro -> utilizar JS para festionr el formulario
})






app.listen(PUERTO)