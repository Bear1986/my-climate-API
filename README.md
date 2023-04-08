**Pre-requisites**

Json viewer chrome extension
https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=en

an account at Rapid API
https://rapidapi.com/

Node.js
version 14.15.4 or higher
https://nodejs.org/en/download/

Express
version 4.17.1 or higher
https://expressjs.com/

cheerio
version 1.0.0-rc.3 or higher
https://www.npmjs.com/package/cheerio

Axios
version 0.21.1 or higher
https://www.npmjs.com/package/axios




**What is an API?** 
An API is an application programming interface. It is a set of rules that allow programs to talk to each other. APIs are used all the time in software development, but you may not realize it. Every time you use an app on your phone, send an instant message, or check the weather on your computer, you're using an API.

Essentially an API can be used to connect everything from your Microwave to your car to your phone. The API is the interface that allows these devices to communicate with each other.

You can access APIs like from Tick Tok, Facebook, Twitter, Instagram, and many more. You can also create your own API even which is why I'm going to show you how to create your own API using Node.js and Express and Axios.


**Housekeeping**
Please sign up on the rapid API platform. You can use the link below to sign up.
https://rapidapi.com/

next install Homebrew on your Mac. Homebrew is a package manager for the Mac. It makes installing Node.js and other packages easy. You can use the link below to install Homebrew.
https://brew.sh/

However, if you are using Windows you are the Boss...
All you need is Node.js and you are good to go.

**First Step**

1. Create a folder on your desktop and name it my-climate-API. Or you can name it whatever you want.

2. run: `npm init` in your terminal to create a package.json file, this file will contain all the dependencies for your project.
   
3. for now we will leave the package.json file as it is. We will add more dependencies later. Just press enter to skip all the questions.

4. create a file called index.js and open it in your code editor.

**Second Step**

1. go to cheerio npm page and copy the code for installation here: 
`https://www.npmjs.com/package/cheerio`

explanation: cheerio is a Node.js library that allows you to parse HTML and XML documents. It is similar to jQuery but it is not a full-blown DOM implementation. It is a fast, flexible, and lean implementation of core jQuery designed specifically for the server.
you can use it to pick out the data you want from a web page as if you were using jQuery on the client-side.

2. run: `npm i cheerio` in your terminal to install cheerio.
- you will notice that cheerio has been added to your package.json file.
- N.B: if you are running into issues with Cheerio, for any reason try changing it to the last version in your package.json file. For example, if you are using version 1.0.0-rc.3, try changing it to version 1.0.0-rc.2. This should solve the issue. Remember to run `npm i` after changing the version. 

**Third Step**

1. Go to express npm page and copy the code for installation here:
`https://www.npmjs.com/package/express`
explanation: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is an open-source framework developed and maintained by the Node.js Foundation.

we are going to use express to create our API and listen for requests and send responses.

2. run: `npm i express` in your terminal to install express.
- it should now show up in your package.json file.

**Fourth Step**
1. Go to axios npm page and copy the code for installation here:
`https://www.npmjs.com/package/axios`
explanation: Axios is a promise-based HTTP client that works both in the browser and in a node.js environment. It basically allows you to make HTTP requests to fetch or save data.

2. run: `npm i axios` in your terminal to install axios.
- it should now show up in your package.json file.

**Getting Started**

1) go to your Index.js file and add the following code:
```
const PORT = 8000; // Port to listen on

const express = require('express'); // import express module
const axios = require('axios'); // import axios module
const cheerio = require('cheerio'); // import cheerio module

const app = express() // create express app that puts express in app variable 

app.listen(PORT, () => { // listen on port 8000
    console.log(`Listening on port ${PORT}`); // log to console that we are listening on port 8000
});
```
I have added comments to explain what each line of code does.

2) go to your package.json file and add the following code:
```
{
  "name": "api-template",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
   "start": "nodemon index.js" // add this line
  },
  "author": "Art Beckett",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.3.4",
    "cheerio": "^1.0.0-rc.12",
    "express": "^4.18.2"
  }
}
```
- nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

- run `npm run start` in your terminal to start your server.

N.B you should see the following message in your terminal:
`Listening on port 8000`

**Scraping the data**

1) first I want you to add the following code to your index.js file:
```
app.get("/", (req, res) => {
  // get request to root
  res.send("Hello World! Welcome to my Climate Change News API"); // sent this string to the client which will appear in the browser
});
```
N.B this code must be placed between the `app.listen` and the `app.get` code.

and in your browser go to `http://localhost:8000/` and you should see the following message:
`Hello World! Welcome to my Climate Change News API`

2) Now writing Hello World is cool but we want to get the data from the website and send it to the client. So let's do that.
so add this below your hello world code:

```
// getting news from a Website
app.get("/news", (req, res) => {
    axios.get("https://www.theguardian.com/environment/climate-crisis").then((response) => {
        const html = response.data;
        console.log(html);
    });
});
```

- axios is a promise-based HTTP client that works both in the browser and in a node.js environment. It basically allows you to make HTTP requests to fetch or save data. The axios.get method is used to make a get request to the url provided. The response is then stored in the response variable. that was outputted to the console as html from the website.

3) Now let's get the data we want from the website. So add this below your axios code:

```
const PORT = 8000; // Port to listen on

const express = require("express"); // import express module
const axios = require("axios"); // import axios module
const cheerio = require("cheerio"); // import cheerio module

const app = express(); // create express app that puts express in app variable

const arr = [];

app.get("/", // get request to root found on the server
 (req, res) => {
  // get request to root
  res.send("Hello World! Welcome to my Climate Change News API"); // sent this string to the client which will appear in the browser
});

// getting news from a Website
app.get("/news", (req, res) => {
    axios.get("https://www.theguardian.com/environment/climate-crisis").then((response) => {
        const html = response.data;
        const $ = cheerio.load(html); // load html into cheerio so that we can pick out the data we want

    $('a:contains("climate")', html).each(function() {
      const title = $(this).text()
        const url = $(this).attr('href')
        arr.push({
            title, 
            url
        })
    }); 
    res.json(arr)    
    }).catch((err) => console.log(err));
});

app.listen(PORT, () => {
  // listen on port 8000
  console.log(`Listening on port ${PORT}`); // log to console that we are listening on port 8000
});

```

Using this code we are able to get the data we want from the website and send it to the client by opening the url `http://localhost:8000/news` in the browser.
- What this essentially does is that it goes to the website and gets the html and then loads it into cheerio. Then it looks for the anchor tag that contains the word climate and then gets the text and the url and pushes it into an array. Then it sends the array to the client as json.

N.B havening the extension Json viewer in your browser will make it easier to view the json data.

**Is That all**

the short answer is no the long answer is we need more to offer so let's add some more features and make it more user friendly for anyone whom might purchase this API.

**Getting multiple News Sources**

1) I'm now going to go into a new arr and make a list of newspapers I'm going to scrape the Times, The Guardian, the BBC amd the Telegraph. So add this to your index.js file:

```
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
    name: "BBC",
    address: "https://www.bbc.co.uk/news/science_and_environment",
    base: "https://www.bbc.co.uk",
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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

```
From here you should get an idea of what is going on. I'm looping through the newspapers array and making a get request to each of the newspaper websites and then getting the html and loading it into cheerio. Then I'm looking for the anchor tag that contains the word climate and then getting the text and the url and pushing it into an array. Then I'm sending the array to the client as json. You will see this array is empty when you go to the url `http://localhost:8000/news` in the browser.

**Adding more features and News sources**

1) So now we have the data we want from the websites but we want to make it more user friendly. So let's add some more features. So add this to your index.js file:

```
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
  
  ```

1) Now you can go to the url `http://localhost:8000/news/thetimes` and you will get the articles from the times. You can do this for any of the other newspapers. You can also go to the url `http://localhost:8000/news` and you will get all the articles from all the newspapers and you can see that the source is the name of the newspaper. You can do this for any of the other newspapers as long as they are in the array of newspapers.

**Final refactoring**

1) In your terminal run `npm install nodemon -g` to install nodemon globally. This will allow you to make changes to your code and see the changes without having to restart the server. So now you can run `nodemon index.js` and you will see the server running and you can make changes to your code and see the changes without having to restart the server.

2) finally change the port option in your index.js file to `const PORT = process.env.PORT || 8000;` so that you can deploy your app to heroku. or you can just use the port 8000 if you are not deploying to heroku. In my case I normally deploy to Netlify so I will use the port 8000. However I'm not going to deploy it to Netlify because I want to use it for educational purposes. So I will use the port 8000.

however if you want to deploy it you can do that by following the steps below:

--commit your code to github

-- first go to RapidAPI and name your API and give it a description and click on create API and give it a category and add a specification.

-- then deploy your API to wherever you want and make sure you can use it in your browser and it works the way you want it to work.

-- then go to RapidAPI and click on the API you created and click on the documentation tab and click on the edit button and add an image and add the URL of your API and click on save.

-- then add some endpoints to your API and add the URL of your API and click on save.

(just in case you didn't endpoints are the locations of your API so one endpoint could be /news and another endpoint could be /news/thetimes ect)

-- give good descriptions to your endpoints and click on save.

-- you don't have any other prams so you don't have to add any other prams. However if you did have prams you would add them below.

-- if you want to make money from your API you can add a pricing plan and add a price and a description and click on save.

-- then click on the publish tab and click on the publish button and click publish and you will see a message saying your API has been published.


**Conclusion**

This was a basic project to get your feet wet with web scraping and APIs. You can use this as a template for your own projects. You can use this to get the news articles from any website. You can also use this to get the news articles from any website that has a search function. You can also use this to get the news articles from any website that has a search function and you can use the search function to search for a specific keyword. You can also use this to get the news articles from any website that has a search function and you can use the search function.

I hope you enjoyed this tutorial and I hope you learned something new. If you have any questions or comments please let me know 









