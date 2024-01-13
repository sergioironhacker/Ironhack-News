const fetch = require("node-fetch");
const apiKey = process.env.NEWS_API_KEY;
const mongoose = require("mongoose");
const News = require("../models/News.model");
const User = require("../models/User.model");
const axios = require("axios");

// regular news

module.exports.listNews = function (req, res, next) {
  News.find()
    .populate("likes")
    .then((news) => res.render("news/news-index", { news }))
    .catch((error) => next(error));
};

module.exports.details = (req, res, next) => {
  const { id } = req.params;

  News.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .populate("likes")
    .then((news) => {
      if (news) {
        res.render("news/article", news);
      } else {
        res.redirect("/news");
      }
    })
    .catch(next);
};

//API news

module.exports.getNews = async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("La respuesta de la red no fue correcta");
    }

    const data = await response.json();
    res.render("apiNews/news", { articles: data.articles });
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    res.render("apiNews/news", { articles: [] });
  }
};

module.exports.getJapanNews = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;

    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?country=jp&token=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("La respuesta de la red no fue correcta");
    }

    const data = await response.json();
    res.render("apiNews/japanNews", { articles: data.articles });
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    res.render("apiNews/japanNews", { articles: [] });
  }
};

module.exports.getSpainNews = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;

    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?country=pt&token=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("La respuesta de la red no fue correcta");
    }

    const data = await response.json();
    res.render("apiNews/europeNews", { articles: data.articles });
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    res.render("apiNews/europeNews", { articles: [] });
  }
};

module.exports.getOceaniaNews = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;

    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?country=gr&token=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("La respuesta de la red no fue correcta");
    }

    const data = await response.json();
    res.render("apiNews/oceaniaNews", { articles: data.articles });
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    res.render("apiNews/oceaniaNews", { articles: [] });
  }
};

module.exports.getafricanNews = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;

    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?country=eg&token=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("La respuesta de la red no fue correcta");
    }

    const data = await response.json();
    res.render("apiNews/africanNews", { articles: data.articles });
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    res.render("apiNews/africanNews", { articles: [] });
  }
};

module.exports.getAntartidaNews = async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;

    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?country=gr&token=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("La respuesta de la red no fue correcta");
    }

    const data = await response.json();
    res.render("apiNews/antartidaNews", { articles: data.articles });
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    res.render("eapiNews/antartidaNews", { articles: [] });
  }
};

// countries info

module.exports.infoCountries = function (req, res, next) {
  News.find()
    .populate("likes")
    .then((news) => res.render("news/infoCountries", { news }))
    .catch((error) => next(error));
};

// weather

module.exports.weather = async (req, res, next) => {
  try {
    const city = req.query.city || "Spain";
    const apiKey = "0f4b0edc8f284cdb437507a5ebefadca";

    const weatherResponse = await axios.get(
      `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
    );

    const weatherData = {
      name: weatherResponse.data.location.name,
      main: {
        temp: weatherResponse.data.current.temperature,
        feels_like: weatherResponse.data.current.feelslike,
      },
      wind: {
        speed: weatherResponse.data.current.wind_speed,
      },
      cloudcover: weatherResponse.data.current.cloudcover,
      humidity: weatherResponse.data.current.humidity,
    };

    res.render("news/weather", { weather: weatherData });
  } catch (error) {
    next(error);
  }
};
