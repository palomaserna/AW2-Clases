import express from 'express'
import {obtenerProductoporid, obtenerProductos,eliminarProducto} from './funciones.mjs'

//BD---


const PUERTO=3000

const app = express()
//definimos una api rest

//get /api/v1/productos -> todos
app.get('/api/v1/productos', obtenerProductos) //obtener productos se ejecuta cuando hay una peticion(get,api,v1..)


//get /api/v1/productos/:id -> uno por id
app.get('/api/v1/productos/:id',obtenerProductoporid)

//post /api/v1/productos ->dar de alta un nuevo producto

//put /api/v1/productos/:id

//delete /api/v1/productos/:id
app.delete('/api/v1/productos/:id', eliminarProducto)



app.listen(PUERTO)