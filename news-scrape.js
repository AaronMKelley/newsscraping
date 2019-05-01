var request = require('request');
var cheerio = require('cheerio');
var mongojs = require('mongojs');
var express = require('express')
var axios = require("axios");

// var express= require();
// var rp = require('request-promise');
// var router = express.Router();
var databaseUrl = "news_scraper";
var collections = ["news"];
var app = express();

var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

app.get("/", function (req, res) {
    res.send("Hello world");
});

// creat a public static file and loop over it with an ajax call yo view the JSON 
app.get("/all", function (req, res) {
    // Find all results from the news collection in the db
    db.news.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
});

app.get("/scrape", function (req, res) {
    // Make a request via axios for the news section of `ycombinator`
    axios.get("https://www.nytimes.com/section/us").then(function (response) {
        // Load the html body from axios into cheerio
        var $ = cheerio.load(response.data);
        //   console.log(response.data)
        // For each element with a "title" class
        $("#stream-panel li").each(function (i, element) {
            // Save the text and href of each link enclosed in the current element
        //    console.log($(element).html())
            var headline = $(element).find("h2").text();
            var summary = $(element).find("p").text();
            var link = $(element).find("a").attr("href");

            db.news.find({}),function (error,found){
                if (found.length=0){

                }
            }

            console.log(headline,summary,'https://www.nytimes.com'+link) 
        });
    });

    res.send("Scrape Complete");
});


// put articles on to the page. 
app.post('/articles', function (req, res) {
	db.news.insert({headlines: req.body.headlines, summary: req.body.summary, link: req.body.link},function(error, savedArticles) {
        // Log any errors
        if (error) {
          console.log(error);
        }else {
          //the reason why we are sending the savedSong back is because we now have an _id to give to the client
          res.json(savedSong);
        }
      });
    });


app.delete("/comments/:id",function(req,res){
    var id= req.params.id

    db
})




// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});




















