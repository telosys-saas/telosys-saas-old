var Login = {

  init: function() {
    this.display();
  },

  display: function() {
    var html = this.getDisplayHtml();
    $('#main').html(html);
    $('#main').click();
  },

  getDisplayHtml: function() {
    var html =
      '<div style="margin: 0 auto; width: 500px; padding-top: 30px">' +
        '<div class="card" style="padding: 0 0px">' +
          '<div class="card-content">' +
            '<div class="row">' +
              '<div class="col s12">' +
                '<span class="card-title">Sign In</span>' +
              '</div>' +
            '</div>' +
            '<div class="row">' +
              '<div class="col s12">' +

                '<form action="/api/callback" method="POST" class="form">' +
                  '<input type="hidden" name="client_name" value="FormClient" />' +
                    '<div class="input-field col s12">' +
                      '<i class="mdi mdi-account-circle prefix"></i>' +
                      '<input type="text" name="username" id="loginform_username" />' +
                      '<label for="loginform_username">Username</label>' +
                    '</div>' +
                    '<div class="input-field col s12">' +
                      '<i class="mdi mdi-key prefix"></i>' +
                      '<input type="password" name="password" id="loginform_password" />' +
                      '<label for="loginform_password">Password</label>' +
                    '</div>' +
                    '<div class="buttons col s12">' +
                      '<button class="btn">Sign in</button>' +
                    '</div>' +
                  '</div>' +
                '</form>' +
              '</div>' +
              '<div class="row">' +
                '<div class="col s12 center-align">' +
                  '- Or -' +
                '</div>' +
              '</div>' +
              '<div class="row">' +
                '<div class="col s12 center-align">' +
                  '<button class="btn btn-large black light" type="button" onclick="document.location = \'/api/auth/github\'">' +
                    '<span class="fa fa-github fa-2x"></span>' +
                    '&nbsp; &nbsp; &nbsp; Sign in with GitHub' +
                  '</button>' +
                '</div>' +
              '</div>' +
            '<div class="card-action">' +
              'New User ? &nbsp; <a href="#" onclick="Login.createAccount()">Create an account</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    return html;
  },

  createAccount: function() {
    var state = Store.getState();
    state.createAccount = true;
    state.page = 'createAccount';
    Main.display();
  }

};