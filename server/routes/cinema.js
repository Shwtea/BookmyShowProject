const express = require("express");
const User = require("../models/user");
const Cinema = require("../models/cinemas");
const {Movie} = require("../models/movies");
const {SlotTime} = require("../models/slotTime");
const cinemaRouter = express.Router();
// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");



cinemaRouter.post("/api/createCinema", async (req, res) => {
  console.log("********** /api/createCinema ***********");
  try {
    const { cinema_name, state, city, district, pincode } = req.body;
    const existingUser = await Cinema.findOne({ cinema_name });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "Cinema with same name is already present" });
    }
    let cinema = new Cinema({
        cinema_name,
        state,
        city ,
        district,
        pincode
    });
    cinema = await cinema.save();
    res.json(cinema);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

cinemaRouter.post("/api/addMovie/:cinema_id", async (req, res) => {
    try {
      const { id } = req.body;
      const {cinema_id} = req.params;
      console.log(cinema_id);
      console.log(id);
      const movie = await Movie.findById(id);
      console.log(movie);
      let cinema = await Cinema.findById(cinema_id);
  
      if (cinema.movies.length == 0) {
        cinema.movies.push({ movie,movie_name: movie.movie_name });
      } else {
        let isMovieFound = false;
        for (let i = 0; i < cinema.movies.length; i++) {
          if (cinema.movies[i].movie._id.equals(movie._id)) {
            isMovieFound = true;
          }
        }
  
        if (isMovieFound) {
          let moviesss = cinema.movies.find((moviess) =>
          moviess.movie._id.equals(movie._id)
          );
        //   producttt.quantity += 1;
        } else {
            cinema.movies.push({ movie,movie_name: movie.movie_name });
        }
      }
      cinema = await cinema.save();
      res.json(cinema);
      
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

cinemaRouter.post("/api/addTime/:movie_id", async (req, res) => {
    try {
      const { id } = req.body; //slot id
      const {movie_id} = req.params; // movie id
      console.log(movie_id);
      console.log(id);
      const slotTime = await SlotTime.findById(id);
      console.log(slotTime);
      let movie = await Movie.findById(movie_id);
  
      if (movie.slot_time.length == 0) {
        movie.slot_time.push({ slotTime });
      } else {
        let isTimeFound = false;
        for (let i = 0; i < movie.slot_time.length; i++) {
          if (movie.slot_time[i].slotTime._id.equals(slotTime._id)) {
            isTimeFound = true;
          }
        }
  
        if (isTimeFound) {
          let moviesss = movie.slot_time.find((moviess) =>
          moviess.slotTime._id.equals(slotTime._id)
          );
        //   producttt.quantity += 1;
        } else {
          movie.slot_time.push({ slotTime });
        }
      }
      movie = await movie.save();
      res.json(movie);
      
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  cinemaRouter.get("/api/movieByCity/",async(req,res) =>{
    try {
      const {  city } = req.query;
      const movieByCity = await Cinema.findOne({ city });
      // console.log(movieByCity);
      res.json(movieByCity);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  cinemaRouter.get("/api/allCinema", async(req,res) =>{
    try {
      const allCinema = await Cinema.find();
      // console.log(allCinema);
      res.json(allCinema);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  })

module.exports = cinemaRouter;