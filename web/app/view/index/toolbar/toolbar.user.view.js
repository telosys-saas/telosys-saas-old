
var ToolbarUser = {
  init: function() {
    var state = Store.getState();

    var html = '';
    html += '<span class="fa fa-user"></span> '
    if(!state.auth) {
      html += '<span>Error : no authentication</span>';
    } else if (state.auth.authenticated) {
      html += '<span>' + state.auth.userId + ' &nbsp; &nbsp; <button class="btn" onclick="ToolbarUser.logout()">Log out</button> </span>';
    } else {
      html += '<span>Not authenticated &nbsp; &nbsp; <button class="btn" onclick="ToolbarUser.login()">Log in</button> </span>';
    }
    $('#toolbarUser').html(html);
  },

  logout: function() {
    ToolbarUserAction.onLogout();
  },

  login: function() {
    ToolbarUserAction.onLogin();
  }

};