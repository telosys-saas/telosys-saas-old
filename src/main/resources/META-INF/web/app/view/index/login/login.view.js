var Login = {

  init: function() {
    this.display();
  },

  display: function() {
    var html =
      '<div style="margin: 30px auto; width: 500px; padding: 0 10px" class="card">' +
        '<div class="card-content">' +
          '<div class="row">' +
            '<div class="col s12">' +
              '<span class="card-title">Log In</span>' +
            '</div>' +
            '<div class="center col s12">' +
              '<button class="btn" type="button" onclick="document.location = \'/api/auth/github\'">' +
                '<span class="fa fa-github fa-lg"></span>' +
                '&nbsp;Log In with GitHub' +
              '</button>' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="col s12">' +
              '<div class="center">' +
                '- Or -' +
              '</div>' +
            '</div>' +

          '<form action="/api/callback" method="POST" class="form">' +
            '<input type="hidden" name="client_name" value="FormClient" />' +
              '<div class="input-field col s12">' +
                '<i class="material-icons prefix">account_circle</i>' +
                '<input type="text" name="username" id="loginform_username" />' +
                '<label for="loginform_username">Username</label>' +
              '</div>' +
              '<div class="input-field col s12">' +
                '<i class="material-icons prefix">vpn_key</i>' +
                '<input type="password" name="password" id="loginform_password" />' +
                '<label for="loginform_password">Password</label>' +
              '</div>' +
              '<div class="buttons col s12">' +
                '<button class="btn">Sign in</button>' +
              '</div>' +
            '</div>' +
          '</form>' +
        '<div class="card-action">' +
          '<a href="#" onclick="Login.createAccount()">Create an account</a>' +
        '</div>' +
      '</div>' +
      '</div>';
    $('#main').html(html);
    $('#main').click();
  },

  createAccount: function() {
    var state = Store.getState();
    state.createAccount = true;
    Main.display();
  }

};