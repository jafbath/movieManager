const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
const port = process.env.PORT || 4000
const methodOverride = require(`method-override`)
// const moviesControllers = require(`./controllers/movies`)

//DATABASE

const Movie = require(`./models/movies`)
// const Movie = require("./models/movies")


//MIDDLEWARE
app.use(express.static(`public`))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride(`_method`))
// app.use(`/movies`,moviesControllers)

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

//SEED

// router.get("/seed", async (req, res) => {
//     try {
//       await Movie.create([
//         {
//           title: "grapefruit",
//           director: "pink",
//           genre: "[`Action`, `Comedy`, `Horror`, `Drama`, `Fantasy`, `Sci-Fi`, `Documentary`]",
//           rating: 1-10,
//           image: `url`,
//           watchAgain: true,
//         },
        
//       ]);
//       res.redirect("/movies");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//     }
//   });




//INDEX

app.get(`/movies`, async (req,res) => {
    try{
        const allMovies = await Movie.find({})
        res.render(`index.ejs`, {movies: allMovies })
    }catch(err) {
        console.error(err)
    }
})
    


//NEW

app.get(`/movies/new`, (req,res) => {
    res.render(`new.ejs`)
})

//DELETE

app.delete(`/movies/:id`, async (req,res) => {
    try{
        await Movie.findByIdAndDelete(req.params.id)
        res.redirect("/movies")
    }catch(err) {
        console.error(err)
    }
})

//UPDATE

app.put(`/movies/:id`, async (req,res) => {
    if(req.body.watchAgain === `on`){
        req.body.watchAgain = true
    }else {
        req.body.watchAgain = false
    }
    try {
        const updateModel = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.redirect("/movies")
    }catch(err) {
        console.error(err)
    }
})

//CREATE

app.post(`/movies`, async (req,res) => {
    console.log(req.body)
    if (req.body.watchAgain === `on`) {
        req.body.watchAgain = true
    } else {
        req.body.watchAgain = false
    }
    try{
        const createdMovie = await Movie.create(req.body)
        res.redirect(`/movies`)
    }catch(err) {
        console.error(err)
    }
})

//EDIT

app.get('/movies/:id/edit', async (req, res)=>{
    try {
        const foundMovie = await Movie.findById(req.params.id)
        res.render("edit.ejs", { movie: foundMovie})
    }catch(err) {
        console.error(err)
    }
})
	

//SHOW

app.get(`/movies/:id`, async (req,res) => {
    try {
        const foundMovie = await Movie.findById(req.params.id)
        res.render("show.ejs", { movie: foundMovie })
    }catch(err) {
        console.error(err)
    }
})



//SERVER
app.listen(port, () => {
    console.log(`listening on ${port}`)
})