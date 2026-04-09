export async function obtenerUsuarios() {
  const respuesta = await fetch('https://api.escuelajs.co/api/v1/users')
  const usuarios = await respuesta.json()

  const usuariosFormateados = usuarios.map(usuario => ({
    id: usuario.id,
    name: usuario.name,
    email: usuario.email
  }))

  return usuariosFormateados
}


























