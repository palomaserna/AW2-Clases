import http from 'node:http'
import path from 'node:path'
import fsp from 'node:fs/promises'

const app = http.createServer(async(peticion, resp)=>{

     if(peticion.method=== 'GET'){
        if(peticion.url === '/usuarios'){
            try{

                const respuesta = await fetch('https://api.escuelajs.co/api/v1/users ')
                const usuarios = await respuesta.json()
               
                 const ruta = path.join('./usuarios.json')
                 const guardarDatos = JSON.stringify(usuarios, null, 4)
                 await fsp.writeFile(ruta, guardarDatos)
                 const contenido = await fsp.readFile(ruta, 'utf8')
                 respuesta.statusCode = 200
                return resp.end(contenido)
               
            }
            catch(e){
                console.log(e)
                resp.statusCode = 500
                 return respuesta.end('Recurso no encontrado')

            }
        }
    }

    respuesta.statusCode = 404       
  return respuesta.end('Recurso no encontrado')
 })
app.listen(3000, ()=>{
    console.log(`servidor escuchando en http://localhost:3000`)
})

 