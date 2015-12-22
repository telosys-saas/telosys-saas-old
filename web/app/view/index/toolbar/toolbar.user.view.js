
var ToolbarUser = {
  init: function() {
    var user = '';
    var state = Store.getState();
    if(!state.auth) {
      user += '<span>Error : no authentication</span>';
    } else if (state.auth.authenticated) {
      user += '<span>' + state.auth.userId + '<button class="btn" onclick="ToolbarUser.logout()">Log out</button></span>';
    } else {
      user += '<span>Not authenticated<button class="btn" onclick="ToolbarUser.login()">Log in</button></span>';
    }
    $('#toolbarUser').html(user);
  },

  logout: function() {
    ToolbarUserAction.onLogout();
  },

  login: function() {
    ToolbarUserAction.onLogin();
  }

};