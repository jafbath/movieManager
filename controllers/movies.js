const express = require(`express`)
const router = express.Router()
const Movie = require(`../models/movies`)


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

  //INDUCES

  //INDEX

router.get(`/`, async (req,res) => {
  try{
      const allMovies = await Movie.find({})
      res.render(`index.ejs`, {movies: allMovies })
  }catch(err) {
      console.error(err)
  }
})
  


//NEW

router.get(`/new`, (req,res) => {
  res.render(`new.ejs`)
})

//DELETE

router.delete(`/:id`, async (req,res) => {
  try{
      await Movie.findByIdAndDelete(req.params.id)
      res.redirect(`/movies`)
  }catch(err) {
      console.error(err)
  }
})

//UPDATE

router.put(`/:id`, async (req,res) => {
  if(req.body.watchAgain === `on`){
      req.body.watchAgain = true
  }else {
      req.body.watchAgain = false
  }
  try {
      const updateModel = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.redirect(`/movies`)
  }catch(err) {
      console.error(err)
  }
})

//CREATE

router.post(`/`, async (req,res) => {
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

router.get('/:id/edit', async (req, res)=>{
  try {
      const foundMovie = await Movie.findById(req.params.id)
      res.render(`edit.ejs`, { movie: foundMovie})
  }catch(err) {
      console.error(err)
  }
})


//SHOW

router.get(`/:id`, async (req,res) => {
  try {
      const foundMovie = await Movie.findById(req.params.id)
      res.render(`show.ejs`, { movie: foundMovie })
  }catch(err) {
      console.error(err)
  }
})



  module.exports = router