//formulate the schema

// const mongoose = require(`mongoose`)
// const Schema = mongoose.Schema

// const movieSchema = new Schema({
//     title: {type: String, required: true},
//     director: {type: String, required: true},
//     genre: {type: [String], enum: [`Action`, `Comedy`, `Horror`, `Drama`, `Fantasy`, `Sci-Fi`, `Documentary`]},
//     rating: {type: Number, required: true, min: 1, max: 10},
//     image: { type: String },
//     watchAgain: Boolean
// })

// const Movie = mongoose.model(`Movie`, movieSchema)


const Movie = [
    {
        title: `harry`,
        director: `cheese`,
        genre: `horror`,
        rating: 4,
        image: `url`,
        watchAgain: true,
    }
]



module.exports = Movie