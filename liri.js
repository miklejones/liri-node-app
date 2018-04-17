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

var task = nodeArgs[2];
var userRequest = nodeArgs[3];


//Set up Functions for use in logic

function myTweets() {
    var params = {
        q: 'Mikle_Jones',
        count: 20,
        lang: 'en'
    };
    client.get('search/tweets', params, function (error, tweets, response) {
        if (!error) {
            //need an if else statement for if there is a search term

            //for loop that pulls just the tweet and when they were created
            for (let i = 0; i < tweets.statuses.length; i++) {
                let time = tweets.statuses[i].created_at;
                let status = tweets.statuses[i].text;
                let tweetNum = i + 1;
                console.log(`Tweet ${tweetNum}. You tweeted "${status}" \non ${time}\n\n`)
            }
        }
    });
};

function spotifyThisSong() {

    
    //if statement that will return info for ace of base if nothing is put in
    if (!userRequest) {
        spotify.search({ type: 'track', query: "The Sign Ace of Base", limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            let albumName = data.tracks.items[0].album.name;
            let songName = data.tracks.items[0].name;
            let artist = data.tracks.items[0].artists[0].name;

            console.log("Artist : " + artist);
            console.log("Song : " + songName);
            console.log("Album : " + albumName);
        });
    } else {


        spotify.search({ type: 'track', query: userRequest, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            let albumName = data.tracks.items[0].album.name;
            let songName = data.tracks.items[0].name;
            let artist = data.tracks.items[0].artists[0].name;

            console.log("Artist : " + artist);
            console.log("Song : " + songName);
            console.log("Album : " + albumName);

        });
    };
    // search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
}

//set up logic for functions to play in
switch (task) {
    case 'my-tweets':
        myTweets()
        break;
    case 'spotify-this-song':
        spotifyThisSong()
        break;
    // case 'movie-this':
    //     code block
    //     break;
    // case 'do-what-it-says':
    //     code block
    //     break;
    // default:
    //     code block
}