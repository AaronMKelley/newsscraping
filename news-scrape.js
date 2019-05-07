var request = require('request');
var cheerio = require('cheerio');
var mongojs = require('mongojs');
var express = require('express')
var methodOverride = require('method-override')
var axios = require("axios");
var bodyParser = require('body-parser');

// var express= require();
// var rp = require('request-promise');
// var router = express.Router();
var databaseUrl = process.env.MONGODB_URI || "news_scraper";
var collections = ["news"];


var PORT = process.env.PORT || 3000;
var app = express();
app.set('view engine', 'ejs');
var db = mongojs(databaseUrl, collections);
app.use(express.static('/public'));

// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(methodOverride('_method'))
db.on("error", function (error) {
    console.log("Database Error:", error);
});

app.get("/", function (req, res) {
    res.send("Hello world");
});

// creat a public static file and loop over it with an ajax call yo view the JSON 
app.get("/all", function (req, res) {
    // Find all results from the news collection in the db
    db.info.find({}, function (error, results) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {

            res.render('pages/news', {
                results: results
            })
        }
    });
});

var results = [];


app.get("/pig", function (req, res) {
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
            var pic =$(element).find('img').attr("src");
            


            

            results.push({
                headline: headline,
                summary: summary,
                link: "www.nytimes.com" + link,
                pic:pic
                
            })
            console.log(results)
        })

        db.info.insert(results, function (err, result) {
            // res.send('done');
            res.render('pages/news', {
                results: results
            })
        })
        // res.json(results)
        // console.log(results)
    });

});

app.post('/api/comment/:id', function (req, res) {

    db.info.update(
        { _id: mongojs.ObjectID(req.params.id) },
        { $push: { comments: { _id: mongojs.ObjectId(), comment: req.body.comment} } }
    )


    console.log(req.params.id)
    console.log(req.body.comment)
    res.redirect('/all')




})

app.delete('/api/comment_delete/:id/:comment', function (req, res) {
    db.info.update(
        { '_id':mongojs.ObjectId(req.params.id) },
        { $pull: { "comments": {_id: mongojs.ObjectId(req.params.comment) } } }, function (error, removed) {
            if (error) {
                res.send(error);
            } else {
                console.log(removed)
                res.redirect('/all')
            }

        });
});















// // put articles on to the page. 
app.post('/articles', function (req, res) {
    db.news.insert({ headlines: req.body.headlines, summary: req.body.summary, link: req.body.link }, function (error, savedArticles) {
        // Log any errors
        if (error) {
            console.log(error);
        } else {
            //the reason why we are sending the savedSong back is because we now have an _id to give to the client
            res.json(savedArticles);
        }
    });
});


// app.delete("/comments/:id",function(req,res){
//     var id= req.params.id

//     db
// })




// Listen on port 3000
app.listen(PORT, function () {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});




















