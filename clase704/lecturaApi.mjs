import fsp from 'node:fs/promises'
import path from 'node:path'

try {
  const respuesta = await fetch('https://69cbcc3a0b417a19e07b4548.mockapi.io/api/v1/Productos')
  const productos = await respuesta.json()
  console.log(productos)

  const ruta = path.join('./datosApi.txt')
  await fsp.writeFile(ruta, JSON.stringify(productos, null, 2))
  console.log("Datos guardados en datosApi.txt")
} catch (e) {
  console.log(e)
}