(function() {
  function albumCtrl(Fixtures) {
    this.albumData = Fixtures.getAlbum();
  }
  angular
    .module('blocJams')
    .controller('albumCtrl',['Fixtures',albumCtrl]);

  })();
