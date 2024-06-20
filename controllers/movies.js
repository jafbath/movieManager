const express = require(`express`)
const router = express.Router()
const Movie = require(`../models/movies`)


//SEED

router.get("/seed", async (req, res) => {
    try {
      await Movie.create([
        {
          title: "grapefruit",
          director: "pink",
          genre: "[`Action`, `Comedy`, `Horror`, `Drama`, `Fantasy`, `Sci-Fi`, `Documentary`]",
          rating: 1-10,
          image: `url`,
          watchAgain: true,
        },
        
      ]);
      res.redirect("/movies");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

  //INDUCES



  module.exports = router