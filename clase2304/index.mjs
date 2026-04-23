import express from 'express'

const puerto = 3000
const app = express()
//express -> chequear datos del cliente cuerpo (avisamos) (es una configuracion)
//p.use(express.urlencoded({extended:true}))

app.use(express.json())

//-----
 const productos=[
        {
            id:1,
            nombre: 'camiseta',
            precio:2000
        },
        {
            id:2,
            nombre: 'pantalon',
            precio:2000
        }
       
    ]

const obtenerRaiz =(req, rest)=>{
  //  rest.status(200)

    rest.end('estas en la raiz')
}

app.get('/', obtenerRaiz)

app.get('/productos',(req, rest)=>{

    
     // materia:'aw2' //tiene estructura de datos, objeto java
    
    rest.json(productos)
   // rest.status(200)
    //rest.sendstatus(204)

   // rest.json(miObjeto) //lo convierte en texto
    //rest.set('content-type', 'text/html')
    //rest.set('content-type', 'application/json')
    //rest.send('<h1>usuarios</h1>')
    //rest.send('{"materia":"aw2"}') //cadena con formato json
})


app.get('/productos/:id',(req, rest)=>{
    const id=parseInt(req.params.id)
    console.log(id)
    
    const productosFiltrados=productos.filter((producto)=>{
        return (producto.id === id)
    })
    if(productosFiltrados.length >0){
        rest.json(productosFiltrados)
    }
    else{
        rest.json({"mensaje":"producto no encontrado"})
    }
   
})

app.post('/productos', (req,res)=>{
    //verficamos el cuerpo del mensaje
    const datosClientes = req.body;
    productos.push(datosClientes)
    res.status(201).json({mensaje: "producto dado de alta"})
 // res.send('el texto q enviaste es:' + datosClientes)
  // console.log (datosClientes)
  // res.json(datosClientes)
})

app.listen(puerto, ()=>{
    console.log(`http://localhost:${puerto}`)
})