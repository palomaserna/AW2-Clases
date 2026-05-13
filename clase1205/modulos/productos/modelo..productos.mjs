//capa encargada de los datos pj: consultas a una base de datos local o externa 
import productos from '../../productos.mjs'

export function obtenerTodos(){
    //si tomamos los datos de un archivo json aca estarian el readFile
    return productos
}

export function obtenerUno(id){
    const id_producto =Number(id)
    const productoFiltrados= productos.datos.filter((producto)=>{
        return Number(producto.id) === id_producto
    })
    return productoFiltrados
}

export function borrarUno (id){
    const id_producto= Number(id)
    //filter
    const cantidadItems =productos.datos.length
    productos.datos.forEach((producto, indice) => {
        if(Number(producto.id)===id_producto){
            productos.datos.splice(indice, 1)
        
            
        }

    
      
    })
   if(cantidadItems>productos.datos.length){
    return true
   }else{
    return false
   }
}
