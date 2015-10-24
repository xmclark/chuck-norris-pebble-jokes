/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

//var prettyObj = require('prettyPrintObject');

var chuck = 'http://api.icndb.com/jokes/random';

var main = new UI.Card({
  title: 'Chuck Norris',
  subtitle: 'Jokes!',
  body: 'Press Select -->'
});


var joke = new UI.Card({
  title: 'Joke:',
  body: 'Pow!'
});


main.show();
walkerTexasRanger();

main.on('click', 'select', function (e) {
  joke.show();
});

joke.on('click','select',walkerTexasRanger);
        
function walkerTexasRanger() {
  joke.title('Joke');
  joke.body('Pow');
  Vibe.vibrate('long');
  setTimeout(
    function () {
      ajax({url: chuck, type:'json'},jokeSuccess,jokeFailure);
    }
  );
}        
function jokeSuccess (data) {
  if(data.type === 'success'){
    joke.body(data.value.joke); 
    console.log('Joke:\n'+data.value.joke);
  }
}
function jokeFailure (err) {
  console.log('error: '+err);
}
/*joke.on('click','down',displayJoke(joke));
joke.on('click','select',function() {joke.title('test test');});
joke.on('click','back', function () {
  main.show();
  joke.hide();
});
*/
