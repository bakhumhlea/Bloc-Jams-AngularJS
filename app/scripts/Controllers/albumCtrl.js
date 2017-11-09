(function() {
  function albumCtrl() {
    this.albumData = angular.copy(albumElectronic);
    this.songs = [];
    for (var n=0; n<albumElectronic.songs.length; n++) {
      this.songs.push(albumElectronic.songs[n]);
    }
  }
  angular
    .module('blocJams')
    .controller('albumCtrl',albumCtrl);

  })();
