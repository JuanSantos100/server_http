const http = require ('http')
const express = require ('express')
const bodyParser = require ('body-parser')


let contador = 3
let clientes = [
    {
        id: 1,
        nome: 'Joao',
        email: 'joao@email.com'
    },
    
    {
        id: 2,
        nome: 'Cristina',
        email: 'cristina@email.com'
    }
]

const app = express()
app.use(bodyParser.json())
const porta = 3000
app.set('port', porta)


//localhost:3000/clientes (POST)
app.post('/clientes', (req, res) => {
    const cliente = {
        id: contador++,
        nome: req.body.nome,
        email: req.body.email
    }
    clientes.push(cliente)
    res.status(201).json(clientes)
})

//Fazendo atualização de um cliente
//localhost:3000/clientes (PUT)
app.put('/clientes', (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;
    
    const position = clientes.findIndex(cliente => cliente.id == id)

    const cliente = {id, nome, email}
    clientes[position] = cliente
    
    res.status(200).json(clientes)

})

//solução prof
app.put('/clientes/:id', (req, res) => { //após o : na URL, vc busca essa informação em params
    const id = req.params.id
    clientes[clientes.findIndex(cli => cli.id === id)]
    cliente.nome = req.body.nome
    cliente.email = req.body.email

    res.status(200).json(cliente)
})

//Fazendo delete de um cliente
//localhost:3000/clientes (DELETE)
app.delete('/clientes', (req, res) => {
    const id = req.body.id
    const position = clientes.findIndex(cliente => cliente.id == id)
    clientes.splice(position, 1)
    res.status(200).json(clientes)
})


//localhost:3000/clientes (GET)
app.get('/clientes', (req, res) => {
    res.json(clientes)
})


//localhost:3000/teste (GET)
app.get ('/teste', (req, res) => {
    console.log ("Passando por aqui...")
    res.send ('Olá!')
})




const server = http.createServer(app)
server.listen(porta)