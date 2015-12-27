var Main = {
  init: function() {
    Store.init()
      .then(function() {
        this.display();
      }.bind(this))
      .catch(function(e) {
        console.log('Error: ',e);
      });
  },

  display: function() {
    var state = Store.getState();

    if(!state.auth.authenticated) {
      document.location = 'login.html';
    }

    Toolbar.init();
    if(state.projectId) {
      IDE.init();
    } else {
      Projects.init();
    }

    Websocket.init();
  }
};
