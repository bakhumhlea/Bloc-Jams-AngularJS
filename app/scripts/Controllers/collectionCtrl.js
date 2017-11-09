 (function() {
      function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(4);
      }

      angular
          .module('blocJams')
          .controller('CollectionCtrl', ['Fixtures',CollectionCtrl]);
  })();
