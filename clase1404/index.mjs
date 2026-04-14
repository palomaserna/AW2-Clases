//Modulo http 
import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'

//creamos una instancia de servidor 
const app = http.createServer(async(peticion, respuesta)=> {
   // console.log(peticion) //viene del cliente
   // console.log(peticion.method)
   if(peticion.method=== 'GET'){
    if(peticion.url === '/'){
        //antes del end todo. despues nada
        respuesta.statusCode =200
        return respuesta.end(`
            ruta raiz /
        `)

    }
     if(peticion.url === '/usuarios'){
        //antes del end todo. despues nada
        respuesta.statusCode = 200
        return respuesta.end(`
         ruta usuarios/usuarios
        `)
         }
   }
   if(peticion.method=== 'POST'){
    if(peticion.url === '/'){
        const ruta='./contenido.txt'
        await fsp.writeFile(ruta,'contenido falso')
        return respuesta.end('Recurso creado')
    }
   }
    
  //respuesta.statusCode = 404       
  //return respuesta.end('no se encontro la ruta')
})

// abrimos puerto 
app.listen(3000, ()=>{
    console.log(`servidor escuchando en http://localhost:3000`)
})