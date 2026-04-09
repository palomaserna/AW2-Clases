import fsp from 'node:fs/promises'
import path from 'node:path'

try {
 // await fsp.writeFile('./texto.txt', 'nuevo contenido')
 // console.log("Archivo escrito correctamente")
 const ruta = path.join('./texto.txt')
 fsp.writeFile(ruta, 'nuevo contenido')
} catch (e) {
  console.log(e)
}


