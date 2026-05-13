//mvc=modelo(se encarga de la capa de datos), vista, controlador(conectar v con m)
//node: dos sistemas de module (module)
// npm i -E (para que no instale versiones superiores)

import express from 'express'
import * as controlodar from './modulos/productos/controlador.productos.mjs'

const PUERTO=3000

const app=express()

///OBTENER TODOS LOS PRODUCTOS
app.get('/api/v1/productos', controlodar.obtenerTodos)
app.get('/api/v1/productos/:id', controlodar.obtenerUno)

app.listen(PUERTO)