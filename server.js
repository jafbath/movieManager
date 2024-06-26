const express = require(`express`)
const app = express()
const methodOverride = require(`method-override`)
require(`dotenv`).config()
const mongoose = require(`mongoose`)
const port = process.env.PORT || 4000
const moviesController = require(`./controllers/movies`)


const mongoURI = process.env.mongoURI
//DATABASE

const Movie = require(`./models/movies`)

//MIDDLEWARE
app.use(express.static(`public`))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride(`_method`))

//CONTROLLERS
app.use(`/movies`, moviesController)


async function connectToMongo() {
    try{
        await mongoose.connect(mongoURI)
        console.log("The connection with MongoDB is established")
    } catch(err) {
        console.error("Error connecting to MongoDB: ", err)
    }
}

connectToMongo()


//INDUCES


//SERVER
app.listen(port, () => {
    console.log(`listening on ${port}`)
})