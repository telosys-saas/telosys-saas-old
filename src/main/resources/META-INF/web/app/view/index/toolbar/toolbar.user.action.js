
var ToolbarUserAction = {

  onLogout: function() {
    document.location = '/api/auth/logout?url=/';
  },

  onLogin: function() {
    document.location = '/login.html';
  }

};