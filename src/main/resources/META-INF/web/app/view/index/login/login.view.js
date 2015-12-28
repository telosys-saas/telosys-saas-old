var Login = {

  init: function() {
    this.display();
  },

  display: function() {
    var html =
      '<div>' +
        '<div style="width: 400px; margin: 0 auto;">' +
        '<form action="/api/callback" method="POST" class="form">' +
          '<h1>Sign in to Telosys SaaS</h1>' +
          '<input type="hidden" name="client_name" value="FormClient" />' +
          '<div>' +
            '<label>' +
              'Login:' +
              '<input type="text" name="username" />' +
            '</label>' +
          '</div>' +
          '<div>' +
            '<label>' +
              'Password:' +
              '<input type="password" name="password" />' +
            '</label>' +
          '</div>' +
          '<div class="buttons">' +
            '<button class="btn">Sign in</button>' +
            '&nbsp;'+
            '<button class="btn" type="button" onclick="document.location = \'/api/auth/github\'">' +
              '<span class="fa fa-github fa-lg"></span>' +
              'Sign in with GitHub' +
            '</button>' +
          '</div>' +
        '</form>' +
        '<div>' +
          '<a href="#" onclick="Login.createAccount()">Create account</a>' +
        '</div>' +
      '</div>' +
    '</div>';
    $('#main').html(html);
  },

  createAccount: function() {
    var state = Store.getState();
    state.createAccount = true;
    Main.display();
  }

}