/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

var prettyObj = require('prettyPrintObject');

var chuck = 'http://api.icndb.com/jokes/random';

var main = new UI.Card({
  title: 'Chuck Norris',
  subtitle: 'Jokes!',
  body: 'Press any button.'
});

main.show();

var joke = new UI.Card({
  title: 'Joke',
  body: 'Pow!'
});

main.on('click', 'select', function (e) {
  joke.show();
  main.hide();
  displayJoke(joke);
});

function displayJoke (card) {
  console.log(card);
  card.title('Joke:');
  card.body('pow!');
  // Send a long vibration to the user wrist
  Vibe.vibrate('long');
  setTimeout(
    function () {
      ajax({url: chuck,type: 'json'},function(data){if(data.type==='success'){card.body(data.value.joke);}});
    },1000);
}

joke.on('click','up',displayJoke(joke));
joke.on('click','down',displayJoke(joke));
joke.on('click','select',function() {console.log(prettyObj(joke));});
joke.on('click','back', function () {
  main.show();
  joke.hide();
});

