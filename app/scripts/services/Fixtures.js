(function() {
     function Fixtures() {
         var Fixtures = {};

         var albumElectronic = {
            title: 'Electronic Retro Sound',
            artist: 'Roosevelt and Friends',
            label: 'my Playlist 1',
            year: '2017',
            albumArtUrl: '/assets/images/album_covers/01.png',
            songs: [
              { title: 'Roosevelt - Colours', duration: '259.80', audioUrl: '/assets/music/Colours.m4a' },
              { title: 'Parcels - Overnight', duration: '219.00', audioUrl: '/assets/music/Overnight.m4a' },
              { title: 'Breakbot - Why (feat.Ruckazoid)', duration: '322.04', audioUrl: '/assets/music/Why (feat. Ruckazoid).mp3' },
              { title: 'Daft Punk feat.Todd Edwards - Fragments of Time',duration: '279.00', audioUrl: '/assets/music/Fragments of Time (feat. Todd Edwards).mp3' }
            ]
         };

         var albumAlternative = {
            title: 'Alternative Rock',
            artist: 'Lucus Nord and Friends',
            label: 'my Playlist 2',
            year: '2017',
            albumArtUrl: '/assets/images/album_covers/20.png',
            songs: [
              { title: 'Lucas Nord feat.Urban Cone - Let Us Stay Young', duration: '204.00', audioUrl: '/assets/music/Let Us Stay Young.m4a' },
              { title: 'Two Door Cinema Club - Changing of The Seasons',duration: '223.00', audioUrl: '/assets/music/Changing of the Seasons.m4a' },
              { title: 'Tahiti80 - Heartbeat', duration: '206.00', audioUrl: '/assets/music/Heartbeat.m4a' },
              { title: 'Justice - New Lands', duration: '254.00', audioUrl: '/assets/music/New Lands.m4a' }
            ]
         };

         Fixtures.getAlbum = function() {
           return albumAlternative;
         };
         Fixtures.getCollection = function(numberOfAlbum) {
           arrayOfAlbum = [];
           for (var i=0;i<numberOfAlbum;i++) {
             arrayOfAlbum.push(albumElectronic);
           }
           return arrayOfAlbum;
         };
         return Fixtures;
     }

     angular
         .module('blocJams')
         .factory('Fixtures', Fixtures);
 })();
