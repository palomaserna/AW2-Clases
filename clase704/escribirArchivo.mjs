import fsp from 'node:fs/promises'

try {
  await fsp.writeFile('./texto.txt', 'nuevo contenido')
  console.log("Archivo escrito correctamente")
} catch (e) {
  console.log(e)
}