var id; // Saves artist's unique Spotify ID
var artist;
var topTracks; // Saves the top tracks (10) for an artist
var artistUrl = 'https://api.spotify.com/v1/search?type=artist&query='
var topUrl = 'https://api.spotify.com/v1/artists/'
var userGuess;

var app = angular.module('app', [])

var ctrl = app.controller('ctrl', function($scope, $http) {
  $scope.audioObject = {}

  $scope.getArtist = function() {
    clearGame();

    // Gets unique Spotify ID for the artist the user inputs
    $http.get(artistUrl + $scope.artist).success(function(response) {

      // Checks to see if artist is valid
      if(response.artists.items == '') {
        alert("Artist not found! Please double check to make sure the artist's name is spelled correctly.")
      } else {

        id = $scope.artists = response.artists.items[0].id

        // Shows the user the artist their choice
        // Uses the Spotify artist name for proper capitalization
        artist = $scope.artist = response.artists.items[0].name
        var choice = document.createTextNode("You've selected: " + artist + "! Good luck");
        $('#choice').append(choice)        

          // Gets the top 10 songs for the artist in the US
          $http.get(topUrl + id + '/top-tracks?country=US').success(function(response) {
            topTracks = $scope.tracks = response.tracks

            // Randomizes order of top tracks
            shuffle(topTracks);
        })
      }
    })
  }

  // Clears/resets game
  function clearGame() {
    $('.row').empty();
    $('#choice').empty();
  }

  // Function from http://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  // Given function to play or pause a song
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});