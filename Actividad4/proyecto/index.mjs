import express from 'express'
console.log('servidor')
const PUERTO = 3000

const app = express()

async function verificarCodigo(req, res, next) {

    const codigoRecibido = req.params.codigo

    const respuesta = await fetch('http://localhost:4321/usuario')
    const usuario = await respuesta.json()

    if (codigoRecibido === String(usuario.codigo)) {
        next()
    } else {
        res.status(400).json({ mensaje: 'El código es incorrecto' })
    }

}

app.get('/:codigo', verificarCodigo, (req, res) => {
    res.status(200).json({ mensaje: 'El código es correcto' })
})

app.listen(PUERTO, () => {
    console.log(`http://localhost:${PUERTO}`)
}) 