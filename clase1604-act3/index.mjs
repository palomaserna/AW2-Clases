
 import http from 'node:http'
import path from 'node:path'
import fsp from 'node:fs/promises'

const app = http.createServer(async (peticion, resp) => {

    if (peticion.method === 'GET') {

        if (peticion.url === '/usuarios') {
            try {
                
                const fetchResp = await fetch('https://api.escuelajs.co/api/v1/users')
                const usuarios = await fetchResp.json()

                const ruta = path.join('./usuarios.json')
                const guardarDatos = JSON.stringify(usuarios, null, 4)
                await fsp.writeFile(ruta, guardarDatos)

                const contenido = await fsp.readFile(ruta, 'utf8')

                resp.setHeader('Content-Type', 'application/json')
                resp.statusCode = 200
                return resp.end(contenido)

            } catch (e) {
                console.log(e)
                resp.statusCode = 500
                return resp.end('Error interno del servidor')
            }
        }

        if (peticion.url === '/usuarios/filtrados') {
            try {
                const fetchResp = await fetch('https://api.escuelajs.co/api/v1/users')
                const usuarios = await fetchResp.json()

                const filtroUsuarios = usuarios.filter(usuario => usuario.id < 10)

                const ruta = path.join('./filtrados.json')
                const guardarDatos = JSON.stringify(filtroUsuarios, null, 4)
                await fsp.writeFile(ruta, guardarDatos)

                const contenido = await fsp.readFile(ruta, 'utf-8')

                resp.setHeader('Content-Type', 'application/json')
                resp.statusCode = 200
                return resp.end(contenido)

            } catch (e) {
                console.log(e)
                resp.statusCode = 500
                return resp.end('Error interno del servidor')
            }
        }
    }

    resp.statusCode = 404
    return resp.end('Recurso no encontrado')
})

app.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:3000`)
})
