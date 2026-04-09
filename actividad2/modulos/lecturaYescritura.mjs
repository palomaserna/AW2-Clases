import fsp from 'node:fs/promises'
import path from 'node:path'

export async function escribirArchivo(datos) {
  const ruta = path.join('./usuarios.json')
  const guardarDatos = JSON.stringify(datos, null, 4)
  await fsp.writeFile(ruta, guardarDatos)
}

export async function leerArchivo() {
  const ruta = path.join('./usuarios.json')
  const contenido = await fsp.readFile(ruta, 'utf8')
  console.log(contenido)
}






















