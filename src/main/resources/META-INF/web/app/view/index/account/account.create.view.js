var AccountCreate = {

  init: function() {
    this.display();
  },

  // exemple : http://jsfiddle.net/user/signup/
  display: function() {
    $('#main').html(
      '<div style="margin: 30px auto; width: 500px; padding: 0 0px" class="card">' +
        '<div class="card-content">' +
          '<form name="createAccountForm">' +
            '<div class="row">' +
              '<div class="input-field col s12">' +
                '<span class="card-title">Create an account</span>' +
              '</div>' +
              '<div class="input-field col s12">' +
                '<i class="material-icons prefix">account_circle</i>' +
                '<input type="text" name="username" id="createaccountform_username" />' +
                '<label for="createaccountform_username">Username</label>' +
              '</div>' +
              '<div class="input-field col s12">' +
                '<i class="material-icons prefix">mail</i>' +
                '<input type="text" name="mail" id="createaccountform_mail" />' +
                '<label for="createaccountform_mail">E-mail address</label>' +
              '</div>' +
              '<div class="input-field col s12">' +
                '<i class="material-icons prefix">vpn_key</i>' +
                '<input type="text" name="password1" id="createaccountform_password1" />' +
                '<label for="createaccountform_password1">Password<label>' +
              '</div>' +
              '<div class="input-field col s12">' +
                '<i class="material-icons prefix"></i>' +
                '<input type="text" name="password2" id="createaccountform_password2" />' +
                '<label for="createaccountform_password2">Password confirmation</label>' +
              '</div>' +
            '</div>' +
            '<div class="card-action">' +
              '<div class="buttons col s12">' +
                '<a href="#" onclick="AccountCreate.cancelCreateAccount()">Cancel</a>' +
                ' &nbsp; &nbsp; ' +
                '<button type="button" class="btn" onsubmit="AccountCreate.createAccount(this)" >Create account</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  },

  createAccount: function(form) {
    var login = document.forms['createAccountForm'].elements['login'].value;
    var mail = document.forms['createAccountForm'].elements['mail'].value;
    var password1 = document.forms['createAccountForm'].elements['password1'].value;
    var password2 = document.forms['createAccountForm'].elements['password2'].value;
    if(login == null || '' == login.trim()) {
      return;
    }
    if(password1 == null || '' == password1.trim()) {
      return;
    }
    if(password1 != password2) {
      return;
    }
    if(mail == null || '' == mail.trim()) {
      return;
    }
    var user = {
      login: login,
      mail: mail,
      password: password1
    };
    AuthService.createAccount(user, function() {
      alert('User created');
    }.bind(this));
  },

  cancelCreateAccount: function() {
    var state = Store.getState();
    state.createAccount = false;
    Main.display();
  }

};