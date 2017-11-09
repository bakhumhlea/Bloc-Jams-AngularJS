(function() {
     function SongPlayer() {
          var SongPlayer = {};

          var currentSong = null;
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;

          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
             /**
             * @desc if "currentBuzzObject is not null(?)" then currentBuzzObject is stopped
             * and set currentSong.playing stage to null
             */
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 currentSong.playing = null;
             }
             /**
             * @desc set an instsnce of currentBuzzObject by using buzz library call audio file url
             */
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 preload: true
             });
             /** @desc set the "value(?)" of currentSong var equal to "song(which is clicked)(?)"
             */
             currentSong = song;
          };

          /**
          * @function playSong
          * @desc Play the current buzzObject if the object is paused and Set the playing property of song object to true
          * @param {Object} song
          */
          var playSong = function(song) {
            if (currentBuzzObject.isPaused()) {
              currentBuzzObject.play();
              song.playing = true;
            }
          };
          /**@function SongPlayer.play() is "constructor function(?) of this factory service"
          * @desc play song which is clicked.
          */
          SongPlayer.play = function(song) {
            /** @desc if currentSong is not equal to song which is just clicked, then execute setSong(song)
            * set buzzObject to play and set song.playing property to true */
            if (currentSong !== song) {
              setSong(song);
              currentBuzzObject.play();
              song.playing = true;
            /** @desc * else if currentSong equal to the song which is just clicked (means the clicked song is in paused state) 
            * then execute playSong(song) to continue paused song */
            } else if (currentSong === song) {
              playSong(song);
            }
          };
          /** @function SongPlayer.pause() is another "constructor function(?)" of this factory service
          * @desc pause the currently playing song and set song.playing to false*/
          SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
          };
          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
