import { obtenerUsuarios } from './modulos/obtenerDatos.mjs'
import { escribirArchivo, leerArchivo } from './modulos/lecturaYescritura.mjs'

try {
  const usuarios = await obtenerUsuarios()
  await escribirArchivo(usuarios)
  await leerArchivo()
} catch (e) {
  console.log(e)
}















/*import fsp from 'node:fs/promises'
import path from 'node:path'

try {
  const respuesta = await fetch('https://api.escuelajs.co/api/v1/users')
  const usuarios = await respuesta.json()

  
 const usuariosFormateados = usuarios.map(usuario => ({
    id: usuario.id,
    name: usuario.name,
    email: usuario.email
  }))


  const ruta = path.join('./usuarios.json')
 
   const guardarDatos = JSON.stringify(usuariosFormateados, null, 4)
    await fsp.writeFile(ruta, guardarDatos)
 
  const contenido = await fsp.readFile(ruta, 'utf8')
  console.log(contenido)

} catch (e) {
  console.log(e)
}*/


