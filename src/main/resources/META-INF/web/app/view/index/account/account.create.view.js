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
                '<input type="text" name="login" id="createaccountform_login" onchange="AccountCreate.validateLogin()" />' +
                '<label for="createaccountform_login">Username</label>' +
              '</div>' +
              '<div class="input-field col s12">' +
                '<i class="material-icons prefix">mail</i>' +
                '<input type="text" name="mail" id="createaccountform_mail" onchange="AccountCreate.validateMail()" />' +
                '<label for="createaccountform_mail">E-mail address</label>' +
              '</div>' +
              '<div class="input-field col s12">' +
                '<i class="material-icons prefix">vpn_key</i>' +
                '<input type="text" name="password1" id="createaccountform_password1" onchange="AccountCreate.validatePassword1()" />' +
                '<label for="createaccountform_password1">Password<label>' +
              '</div>' +
              '<div class="input-field col s12">' +
                '<i class="material-icons prefix"></i>' +
                '<input type="text" name="password2" id="createaccountform_password2" onchange="AccountCreate.validatePassword2()" />' +
                '<label for="createaccountform_password2">Password confirmation</label>' +
              '</div>' +
            '</div>' +
            '<div class="card-action">' +
              '<div class="buttons col s12">' +
                '<a href="#" onclick="AccountCreate.cancelCreateAccount()">Cancel</a>' +
                ' &nbsp; &nbsp; ' +
                '<button type="button" class="btn disabled" onsubmit="AccountCreate.createAccount(this)" >Create account</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  },

  validateLogin: function() {
    var login = document.forms['createAccountForm'].elements['login'].value;
    if(!login.match(/^[a-zA-Z]+[a-zA-Z0-9_]{2,}$/g)) {
      console.log('not ok login');
    }
  },

  validateMail: function() {
    var mail = document.forms['createAccountForm'].elements['mail'].value;
    if(!mail.match(/^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/g)) {
      console.log('not ok mail');
    }
  },

  validatePassword1: function() {
    var password1 = document.forms['createAccountForm'].elements['password1'].value;
    var password2 = document.forms['createAccountForm'].elements['password2'].value;
    if (!password1.match(/.*[0-9]+.*/g)) {
      console.log('password : missing number');
    }
    if (!password1.match(/.*[A-Z]+.*/g)) {
      console.log('password : missing uppercase character');
    }
    if (!password1.match(/.*[a-z]+.*/g)) {
      console.log('password : missing lowercase character');
    }
    if (!password1.length < 6) {
      console.log('password : too short (6 characters min)');
    }
  },

  validatePassword2: function() {
    var password1 = document.forms['createAccountForm'].elements['password1'].value;
    var password2 = document.forms['createAccountForm'].elements['password2'].value;
    if(password1 !== password2) {
      console.log('password 1 different than password 2');
    }
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