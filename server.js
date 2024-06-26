const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
const port = process.env.PORT || 4000
const methodOverride = require(`method-override`)
const moviesController = require(`./controllers/movies`)


//DATABASE

const Movie = require(`./models/movies`)


//MIDDLEWARE
app.use(express.static(`public`))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride(`_method`))
app.use(`/movies`, moviesController)


const mongoURI = `mongodb+srv://jafbath:ripper11@moviemanager.82w3xlf.mongodb.net/`

async function connectToMongo() {
    try{
        await mongoose.connect(mongoURI)
        console.log(`The connection with MongoDB is established`)
    } catch(err) {
        console.error(`Error connecting to MongoDB: `, err)
    }
}

connectToMongo()


//INDUCES


//SERVER
app.listen(port, () => {
    console.log(`listening on ${port}`)
})