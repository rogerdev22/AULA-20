// Aula 20: Projeto Node pt-03
// Rota : meusite.com/users?name=rogerio&=35
// Usar app.use :Sempre antes das rotas , pois o node, express leem de cima para baixo.
// Uso do firmaware MIDDLEWARE -Inteceptador -pode parar uma requisição 
// para modicar, alterar , excluir
// ULTIMAS MODIFICACOES HOJE 11-09-2022 as 11:01

const express=require('express')

const uuid=require('uuid')

const port=3000

const app=express()

app.use(express.json())
const users=[]

const checkUserId=(request, response, next) =>{
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)
 
    if (index < 0) {
        return request.status(404).json({ error: "user not found" })
    }
    request.userIndex = index
    request.userId = id
  next()
}
    app.get('/users/',(request,response)=> {
        console.log("Rota de Get chamada")
        return response.json(users)
})
     app.post('/users/',(request,response)=> {
        //const user={id:uuid.v4(),name,age}

       // users.push(user)
       console.log("Rota de Post chamada")
        return response.status(201).json(users)
      
            
})
      app.put('/users/:id',(request,response)=>{
         const{name,age}=request.body
         const index=request.userIndex 
         console.log("Rota de PUT chamada") 
         const updateUser= {id,name,age}
         users[index]=updateUser
        
         return response.json(updateUser)
  
})

    app.delete('/users/:id',checkUserId,(request,response)=>{
        const index=request.userIndex
        
        users.splice(index,1)
        console.log("Rota de DEL chamada")
        return response.status(204).json()
  
})

app.listen(3000)       
  // app.listen (port,()=> {
 //  console.log('server started on port${port}')