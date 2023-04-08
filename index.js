const PORT = 8000; // Port to listen on

const express = require("express"); // import express module
const axios = require("axios"); // import axios module
const cheerio = require("cheerio"); // import cheerio module

const app = express(); // create express app that puts express in app variable

// array to store the newspaper articles
const newspapers = [
  {
    name: "thetimes",
    address: "https://www.thetimes.co.uk/environment/climate-change",
    base: "",
  },
  {
    name: "theguardian",
    address: "https://www.theguardian.com/environment/climate-crisis",
    base: "",
  },
  {
    name: "telegraph",
    address: "https://www.telegraph.co.uk/climate-change/",
    base: "https://www.telegraph.co.uk",
  },
  {
    name: "bbc",
    address: "https://www.bbc.co.uk/news/science_and_environment",
    base: "https://www.bbc.co.uk",
  },
  {
    name: "nyt",
    address: "https://www.nytimes.com/international/section/climate",
    base: "",
  },
  {
    name: "latimes",
    address: "https://www.latimes.com/environment",
    base: "",
  },
  {
    name: "smh",
    address: "https://www.smh.com.au/environment/climate-change",
    base: "https://www.smh.com.au",
  },
  {
    name: "un",
    address: "https://www.un.org/climatechange",
    base: "",
  },
  {
    name: "es",
    address: "https://www.standard.co.uk/topic/climate-change",
    base: "https://www.standard.co.uk",
  },
  {
    name: "sun",
    address: "https://www.thesun.co.uk/topic/climate-change-environment/",
    base: "",
  },
  {
    name: "dm",
    address:
      "https://www.dailymail.co.uk/news/climate_change_global_warming/index.html",
    base: "",
  },
  {
    name: "nyp",
    address: "https://nypost.com/tag/climate-change/",
    base: "",
  },
];

const arr = [];

newspapers.forEach((newspaper) => {
  axios
    .get(newspaper.address, { base: newspaper.base })
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        arr.push({
          title,
          url: newspaper.base + url,
          source: newspaper.name,
        });
      });
    })
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  // get request to root
  res.send("Hello World! Welcome to my Climate Change News API"); // sent this string to the client which will appear in the browser
});

app.get("/news", (req, res) => {
  res.json(arr); // send the array of news articles as a JSON response to a GET request to the "/news" endpoint
});

app.get("/news/:newspaperId", async (req, res) => {
  const newspaperId = req.params.newspaperId; // get the id from the request params

  // I want to get the address of the newspaper from the array of newspapers using the id
  // so that within  your browser you can type in the url "localhost:8000/news/thetimes" and it will return the articles from the times or one of the other newspapers

  const newspaperAddress = newspapers.filter(
    (newspaper) => newspaper.name == newspaperId
  )[0].address; // get the address of the newspaper from the array of newspapers using the id
  newspapers.filter((newspaper) => newspaper.name == newspaperId)[0].base; // get the base of the newspaper from the array of newspapers using the id
  axios
    .get(newspaperAddress)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const specificArticles = [];

      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        specificArticles.push({
          title,
          url: newspaperId.base + url,
          source: newspaperId,
        });
      });
      res.json(specificArticles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
