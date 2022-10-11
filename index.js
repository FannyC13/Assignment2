const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/pokemon_api'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db= mongoose.connection


db.on("error", console.error.bind(console, "MongoDB connection error:"));

const PokemonSchema = new mongoose.Schema({
    name: String,
    no: Number,
    abilities: String,
    type: Array
})
const Pokemons = mongoose.model('Pokemons', PokemonSchema)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/pokemons', (req, res) => {
   Pokemons.find((err, pokemons)=> {
    console.log("Pokemons :", pokemons)
    res.json(pokemons)
  })
})
app.use(express.static('public'))

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/html/Pokemon.html')
 })

app.get("/pokemons/:id", (req,res)=>{
    Pokemons.findById(req.params.id,(err,pokemons) =>{
      res.json(pokemons)
    })
    //res.json(pokemon[parseInt(req.params.id)-1])
})

app.post("/pokemons", (req,res) =>{
  const pokemons = new Pokemons({
      name: req.body.name,
      no: req.body.no,
      abilities: req.body.abilities,
      type: req.body.type
      })

  pokemons.save((err)=>{
    res.json(pokemons)
  })
})

app.put("/pokemons/:id", (req,res)=>{

  Pokemons.findByIdAndUpdate(req.params.id, req.body, (err)=> {
    res.json({message: `update pokemon ${req.params.id}`})
  })
  
})

app.delete("/pokemons/:id", (req,res)=>{

  Pokemons.findByIdAndDelete(req.params.id, (err)=> {
    res.json({message: `Delete pokemon ${req.params.id}`})
  })
})
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
