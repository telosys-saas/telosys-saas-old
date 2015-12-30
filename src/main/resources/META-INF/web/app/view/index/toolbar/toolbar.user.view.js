
var ToolbarUser = {
  init: function() {
    var state = Store.getState();

    var html =
      '<ul id="nav-mobile" class="hide-on-med-and-down left">' +
        '<li><a class="dropdown-button" href="#" data-activates="toolbarUserMenu" style="font-size: 20px">' +
          '<span class="fa fa-user"></span> &nbsp;';
    if(state.auth.authenticated) {
      html +=
        state.auth.userId;
    } else {
      html +=
        'Not authenticated'
    }
    html +=
          '<i class="mdi mdi-menu-down right"></i></a></li>' +
      '</ul>';
    $('#toolbarUser').html(html);

    var html = '';
    if(!state.auth.authenticated) {
      html += '<li><a href="#!" onclick="ToolbarUser.login()">Log in</a></li>';
      html += '<li><a href="#!" onclick="Login.createAccount()">Create an account</a></li>';
    } else {
//      html += '<li><a href="#!" onclick="ToolbarUser.settings()">Settings</a></li>';
      html += '<li><a href="#!" onclick="ToolbarUser.changePassword()">Change password</a></li>';
      html += '<li><a href="#!" onclick="ToolbarUser.logout()">Log out</a></li>';
    }
    $('#toolbarUserMenu').html(html);
    $('#toolbarUser .dropdown-button').dropdown();
  },

  logout: function() {
    document.location = '/api/auth/logout?url=/';
  },

  login: function() {
    // document.location = '/login.html';
    var state = Store.getState();
    state.page = 'login';
    Main.display();
  },

  settings: function() {
    ToolbarUserSettings.openModal();
  },

  changePassword: function() {
    ToolbarUserChangePassword.openModal();
  }

};