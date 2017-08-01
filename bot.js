console.log("The bot is starting");

var Twit = require('twit'); //just like an import statement in java

var config = require('./config');

//first thing to do is authenticate with OAuth, check code to do that in guthub twi package
var T = new Twit(config);

//setting up a user stream
var stream = T.stream('user');

//anytime someone follows me
stream.on('follow', followed);

function followed(eventMsg) {
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetz('@'+ screenName + ', thanks for following a robot.');
}

function tweetz(txt) {
	var tweet = {
		status: txt
	}
	T.post('statuses/update', tweet, tweeter)
	function tweeter (err, data, response) {
		if (err) {
			console.log("something went wrong");
		} else {
			console.log("it worked");
		}
	}
}
//setInterval parameters: function and number of miliseconds 1000*20 is 20 seconds
/*setInterval(tweetIt, 1000*20);
function tweetIt() {
	var r = Math.floor(Math.random()*100);
	var tweet = {
		status: 'random number ' + r
	}
	//
	//  tweet 'hello world!'
	//
	T.post('statuses/update', tweet , tweeted)
	function tweeted (err, data, response) {
		if (err) {
			console.log("something went wrong");
		} else {
			console.log("it worked");
		}
	}
}
tweetIt();*/
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
var params = {q: 'happy', count: 2};

function gotData(err, data, response) {
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++) {
		console.log(tweets[i].text);
	}
};

T.get('search/tweets', params, gotData);