(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};

          /**
          * @desc Album's songs information
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();

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
                 SongPlayer.currentSong.playing = null;
                 SongPlayer.currentSong.paused = null;
             }
             /**
             * @desc set an instsnce of currentBuzzObject by using buzz library call audio file url
             */
             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 preload: true
             });

             currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {
                    SongPlayer.currentTime = buzz.toTimer(currentBuzzObject.getTime());
                 });
             });

             /**
             * @desc get song's volume
             */
             SongPlayer.currentVolume = currentBuzzObject.getVolume();

             /** @desc set the "value(?)" of currentSong var equal to "song(which is clicked)(?)"
             */
             SongPlayer.currentSong = song;
             SongPlayer.duration = buzz.toTimer(song.duration);

             /**
             * @desc Current playback time (in seconds) of currently playing song
             * @type {Number}
             */
             SongPlayer.currentTime = null;

          };

          /**
          * @function playSong
          * @desc Play the current buzzObject if the object is paused and Set the playing property of song object to true
          * @param {Object} song
          */
          var playSong = function(song) {
            if (!currentBuzzObject) {
              return;
            } else if (currentBuzzObject.isPaused()) {
              currentBuzzObject.play();
              song.playing = true;
              song.paused = false;
            }
          };
          /**
          * @function stopSong
          * @desc Stop the currentBuzzObject andset song.playing to null
          */
          var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
          }

          /**
          * @function getSongIndex(song)
          * @desc Get the song index from currentAlbum
          * @param {Object}
          */
          var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
          };

          SongPlayer.currentSong = null;

          /**@function SongPlayer.play() is "constructor function(?) of this factory service"
          * @desc play song which is clicked.
          */
          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            /** @desc if currentSong is not equal to song which is just clicked, then execute setSong(song)
            * set buzzObject to play and set song.playing property to true */
            song.paused = false;
            if (SongPlayer.currentSong!== song) {
              setSong(song);
              currentBuzzObject.play();
              song.playing = true;

            /** @desc * else if currentSong equal to the song which is just clicked (means the clicked song is in paused state)
            * then execute playSong(song) to continue paused song */
            } else if (SongPlayer.currentSong === song) {
              playSong(song);
            }
          };
          /** @function SongPlayer.pause() is another "constructor function(?)" of this factory service
          * @desc pause the currently playing song and set song.playing to false*/
          SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
            song.paused = true;
          };

          /**
          * @function SongPlayer.previous()
          * @desc Go to the previous song by using song index
          */
          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            song = song || SongPlayer.currentSong;
            if (song.paused) {
              song.paused = false;
            }
            currentSongIndex--;

            if (currentSongIndex < 0) {
              stopSong(song);
            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
          };
          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            song = song || SongPlayer.currentSong;
            if (song.paused) {
              song.paused = false;
            }
            currentSongIndex++;
            console.log(currentSongIndex);
            console.log(currentAlbum.songs.length)
            if (currentSongIndex >= currentAlbum.songs.length) {
              stopSong(song);
            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
          };

          /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
          SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
              currentBuzzObject.setTime(time);
            }
          };

          SongPlayer.setCurrentVolume = function(volume) {
            if (currentBuzzObject) {
              currentBuzzObject.setVolume(volume);
            }
          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
