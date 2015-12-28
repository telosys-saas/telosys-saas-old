var AccountCreate = {

  init: function() {
    this.display();
  },

  display: function() {
    $('#main').html(
      '<form name="createAccountForm">' +
        '<h4>Create account</h4>' +
        '<div>' +
          '<label>' +
            'Login:' +
            '<input type="text" name="login" />' +
          '</label>' +
        '</div>' +
        '<div>' +
          '<label>' +
            'Mail:' +
            '<input type="text" name="mail" />' +
          '</label>' +
        '</div>' +
        '<div>' +
          '<label>' +
            'Password:' +
            '<input type="text" name="password1" />' +
          '</label>' +
        '</div>' +
        '<div>' +
          '<label>' +
            'Password confirmation:' +
            '<input type="text" name="password2" />' +
          '</label>' +
        '</div>' +
        '<div class="buttons">' +
          '<button type="button" class="btn" onclick="AccountCreate.createAccount(this)" >Create account</button>' +
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
  }

}