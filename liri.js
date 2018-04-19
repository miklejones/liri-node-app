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
        screen_name: 'mikle_jones',
        count: 20,
        result_type: 'recent'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            //for loop that pulls just the tweet and when they were created
            for (let i = 0; i < tweets.length; i++) {
                let time = tweets[i].created_at;
                let status = tweets[i].text;
                let tweetNum = i + 1;
                console.log(`\nTweet ${tweetNum}. You tweeted "${status}" \non ${time}\n`)
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
            let previewLink = data.tracks.items[0].external_urls.spotify;
            console.log("\nArtist : " + artist);
            console.log("Song : " + songName);
            console.log("Preview Link: " + previewLink);
            console.log("Album : " + albumName + "\n");
                    });
    } else {
        spotify.search({ type: 'track', query: userRequest, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            //may be worth spending time to create returns for data without values(such as if a value wasnt returned for 'album' it could say "unsure")
            let albumName = data.tracks.items[0].album.name;
            let songName = data.tracks.items[0].name;
            let artist = data.tracks.items[0].artists[0].name;
            let previewLink = data.tracks.items[0].external_urls.spotify;
            console.log("\nArtist : " + artist);
            console.log("Song : " + songName);
            console.log("Preview Link: " + previewLink);
            console.log("Album : " + albumName + "\n");
                    });
    };
};


function movieThis() {
    request(`http://www.omdbapi.com/?t=${userRequest}&apikey=trilogy`, function (error, response, body) {
        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {
            // Then we print out the imdbRating
            var parsedBody = JSON.parse(body);
            console.log("\nTitle: " + parsedBody.Title);
            console.log("Year: " + parsedBody.Year);
            console.log("imdb Rating: " + parsedBody.imdbRating);
            console.log("Rotten Tomatoe's rating: " + parsedBody.Ratings[1].Value);
            console.log("Country made in: " + parsedBody.Country);
            console.log("Launguage: " + parsedBody.Language);
            console.log("Plot :" + parsedBody.Plot);
            console.log("Actors :" + parsedBody.Actors + "\n");
        }
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log('\nYour command: ' + dataArr[0] + ' ' + dataArr[1]);

        task = dataArr[0];
        userRequest = dataArr[1];

        //Thoughts: there needs to be logic which checks the parts of the array and uses the switch case below to handle the arguments(the trick they want you to fall for is that you think you need to put these values back into the command line but this is struly serverside shit right here)
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
            //I commented this our because i feel like it can cause a fucked up loop. i will test this later.
            // case 'do-what-it-says':
            //     doWhatItSays()
            //     break;
            default:
                console.log('you a asshole');
        }
    });
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
    case 'do-what-it-says':
        doWhatItSays()
        break;
    default:
        console.log('you a asshole');
}