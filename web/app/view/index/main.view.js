var Main = {
  init: function() {
    Store.init()
      .then(function(state) {
        Toolbar.init();
        IDE.init();
      })
      .catch(function(e) {
        console.log('Error: ',e)
      });
  }
};
