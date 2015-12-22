var Main = {
  init: function() {
    Store.init()
      .then(function(state) {

        if(!state.auth.authenticated) {
          document.location = 'login.html';
        }

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
