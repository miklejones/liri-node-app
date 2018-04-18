//call necessities from npm
require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");


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
};

function movieThis() {
    request(`http://www.omdbapi.com/?t=${userRequest}&apikey=trilogy`, function (error, response, body) {
        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
            // Then we print out the imdbRating
            var parsedBody = JSON.parse(body);
            console.log("Title: " + parsedBody.Title);
            console.log("Year: " + parsedBody.Year);
            console.log("imdb Rating: " + parsedBody.imdbRating);
            console.log("Rotten Tomatoe's rating: " + parsedBody.Ratings[1].Value);
            console.log("Country made in: " + parsedBody.Country);
            console.log("Launguage: " + parsedBody.Language);
            console.log("Plot :" + parsedBody.Plot);
            console.log("Actors :" + parsedBody.Actors);
        }
    });
}

function doWhatItSays() {

}

//set up logic for functions to play in
switch (task) {
    case 'my-tweets':
        myTweets()
        break;
    case 'spotify-this-song':
        spotifyThisSong()
        break;
    case 'movie-this':
        movieThis()
        break;
    // case 'do-what-it-says':
    //     doWhatItSays()
    //     break;
    default:
        console.log('you a asshole');
}