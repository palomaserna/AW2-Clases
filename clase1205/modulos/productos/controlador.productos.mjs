import * as modelo from './modelo..productos.mjs'

export function obtenerTodos(req, res){
    //obtenemos de capa modelo la funcion
    const productos = modelo.obtenerTodos()

    res.json(productos)

}

export function obtenerUno(req, res){
    //obtenemos el id del parametro
    const id_producto= req.params.id
    //ejecutamos la funcion importada desde modelo 
    const productos =modelo.obtenerUno(id_producto)
    //verificamos si hay producto y respondemos en consecuencia
    if(productos.length > 0){
        res.json(productos)
    }else {
        res.json({mensaje: 'producto no encontrado'})
    }

}

export function borrarUno(req, res){
    const id_producto= req.params.id
    const productoEliminado =modelo.borrarUno(id_producto)
    if(productoEliminado){
        res.json({mensaje: `producto con id ${id_producto}elimnado`})
    }else{
         res.status(500).json({mensaje: `no se puede eliminar el producto con id ${id_producto}`})
    }

}