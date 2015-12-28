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

    Toolbar.init();

    if(!state.auth.authenticated) {
      if(state.createAccount) {
        AccountCreate.init();
      } else {
        // document.location = 'login.html';
        Login.init();
      }
    }
    else { // authenticated
      if(state.projectId) {
        IDE.init();
      } else {
        Projects.init();
      }
    }

    //Websocket.init();
  }
};
