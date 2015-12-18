
var ToolbarUser = {
  init: function() {
    var user = '';
    var state = Store.getState();
    if(!state.auth) {
      user += '<span>Error : no authentication</span>';
    } else if (state.auth.authenticated) {
      user += '<span>' + state.auth.userId + '<button onclick="document.location=\'/api/auth/logout?url=/\'">Log out</button></span>';
    } else {
      user += '<span>Not authenticated<button onclick="document.location=\'/login.html\'">Log in</button></span>';
    }
    $('#toolbarUser').html(user);
  }
}