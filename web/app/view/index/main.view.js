var Main = {
  init: function() {
    Store.init()
      .then(function(state) {
        Toolbar.init();
        if(state.project) {
          IDE.init();
        } else {
          Projects.init();
        }
      })
      .catch(function(e) {
        console.log('Error: ',e);
      });
  }
};
