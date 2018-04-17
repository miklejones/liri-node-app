//call necessities from npm
require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys.js");

//set keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Take in the command line arguments
var nodeArgs = process.argv;

var task = nodeArgs[2]


//Set up Functions for use in logic

function myTweets() {
    var params = {
        q: 'Mikle_Jones',
        count: 20,
        lang: 'en'
    };
    client.get('search/tweets', params, function (error, tweets, response) {
        if (!error) {
            //for loop that pulls just the tweet and when they were created
            for(let i=0; i< tweets.statuses.length; i++) {
                let time = tweets.statuses[i].created_at;
                let status = tweets.statuses[i].text;
                console.log(`Tweet ${i}. You tweeted "${status}" \non ${time}\n\n`)
            }
        }
    });
}


//set up logic for functions to play in
switch (task) {
    case 'my-tweets':
        myTweets()
        break;
    // case 'spotify-this-song':
    //     code block
    //     break;
    // case 'movie-this':
    //     code block
    //     break;
    // case 'do-what-it-says':
    //     code block
    //     break;
    // default:
    //     code block
}