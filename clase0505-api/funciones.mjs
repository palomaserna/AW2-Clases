import productos from './productos.mjs'

export function obtenerProductos(req,res){
    res.json(productos)
}

export function obtenerProductoporid(req,res){
    const id_producto= Number(req.params.id)
    const productosFiltrados = productos.filter((producto)=>{
        return Number(producto.id) === id_producto
    })
    if(productosFiltrados.length>0){
        const respuesta={
            datos:productosFiltrados,
            url:'http://localhost:3000/api/v1/productos' + id_producto,
            status:404
        }
       res.json(respuesta)
    }else{
        res.status(404).json({
            mensaje:'producto no encontrado'
        })
    }
    }
    
export function eliminarProducto (req, res){
   
    const id_producto= Number(req.params.id)
    //filter
    const productosFiltrados = productos.filter((producto)=>{
        return Number(producto.id) !== id_producto
    })
    //productos=productosFiltrados
    //verificamos si hay elementos en el arreglo
    const respuesta={
         datos:productosFiltrados,
         url:'http://localhost:3000/api/v1/productos' + id_producto,
         status:404,
         verbo:'delete'
        }
       res.json(respuesta)

}
/* Profe
export function eliminar(req,res){
    const id_producto= Number(req.params.id)
    //filter
    const productosFiltrados = productos.filter((producto)=>{
        return Number(producto.id) !== id_producto
    })
    productos=productosFiltrados
    //verificamos si hay elementos en el arreglo
    const respuesta={
         mensaje:'producto eliminado',
         url:'http://localhost:3000/api/v1/productos' + id_producto,
         status:404,
         verbo:'delete'
        }
       res.json(respuesta)
}

*/


/* yop
const id_producto = Number(req.params.id);
    const indiceProducto = productos.findIndex((producto) => {
        return Number(producto.id) === id_producto;
    });

    if (indiceProducto !== -1) {
        const productoEliminado = productos.splice(indiceProducto, 1);
        res.json({
            mensaje: 'Producto eliminado correctamente',
            datos: productoEliminado[0],
            status: 200
        });
    } else {
        res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }


*/
