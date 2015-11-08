var id; // Saves artist's unique Spotify ID
var artist;
var topTracks; // Saves the top tracks for an artist (returns 10 at most)
var artistUrl = 'https://api.spotify.com/v1/search?type=artist&query='
var topUrl = 'https://api.spotify.com/v1/artists/'
var sTrack // Saves the randomly selected track from the top tracks

var app = angular.module('app', [])

var ctrl = app.controller('ctrl', function($scope, $http) {
  $scope.audioObject = {}

  $scope.getArtist = function() {
    // Clears previous query
    $('#song tr').remove();
    $('#choice').empty();

    // Gets unique Spotify ID for the artist the user inputs
    $http.get(artistUrl + $scope.artist).success(function(response) {

      // Checks to see if artist is valid
      if(response.artists.items == '') {
        alert("Artist not found! Please double check to make sure the artist's name is spelled correctly.")
      } else {

        id = $scope.artists = response.artists.items[0].id

          // Gets the top 10 songs for the artist in the US
          $http.get(topUrl + id + '/top-tracks?country=US').success(function(response) {
            topTracks = $scope.tracks = response.tracks

            // Selects a random track from the top 10
            sTrack = $scope.sTrack = topTracks[Math.floor(Math.random() * topTracks.length)];
            console.log(sTrack)

            // Shows the user the artist their choice
            // Uses the Spotify artist name for proper capitalization
            artist = sTrack.artists[0].name
            var choice = document.createTextNode("You selected: " + artist + "! Good luck");
            $('#choice').append(choice)
        })
      }
    })
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