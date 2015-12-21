
var ToolbarUser = {
  init: function() {
    var user = '';
    var state = Store.getState();
    if(!state.auth) {
      user += '<span>Error : no authentication</span>';
    } else if (state.auth.authenticated) {
      user += '<span>' + state.auth.userId + '<button onclick="ToolbarUser.logout()">Log out</button></span>';
    } else {
      user += '<span>Not authenticated<button onclick="ToolbarUser.login()">Log in</button></span>';
    }
    $('#toolbarUser').html(user);
  },

  logout: function() {
    ToolbarUserAction.logout();
  },

  login: function() {
    ToolbarUserAction.login();
  }

};