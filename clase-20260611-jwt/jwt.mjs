import jwt from 'jsonwebtoken'

//sign -firmar el token
//verify - verificar la firma

jwt.sign({usuario:'palo'},'largaysupersecreta',{expiresIn:'1h'},(error, token)=>{
    console.log(token)
})
