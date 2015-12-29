var ToolbarUserChangePassword = {

  init: function() {
    this.display();
  },

  loadData: function(callback) {
    var state = Store.getState();
    AuthService.getAccount(state.auth.userId, function(account) {
      state.account = account;
      if(callback) {
        callback();
      }
    });
  },

  display: function() {
    var state = Store.getState();
    $('#changepassword').html(
      '<div id="changepasswordModal" class="modal">' +
        '<div class="modal-content">' +
          '<h4>Change password</h4>' +
          '<div class="row">' +
            '<div class="input-field col s12">' +
              '<i class="material-icons prefix">vpn_key</i>' +
              '<input type="password" id="changepasswordform_password1" onchange="ToolbarUserChangePassword.onchangePassword1()" />' +
              '<label for="changepasswordform_password1" id="changepasswordform_password1_label">Password<label>' +
            '</div>' +
            '<div class="input-field col s12">' +
              '<i class="material-icons prefix"></i>' +
              '<input type="password" id="changepasswordform_password2" onchange="ToolbarUserChangePassword.onchangePassword2()" />' +
              '<label for="changepasswordform_password2" id="changepasswordform_password2_label">Password confirmation</label>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<a href="#!" id="changepasswordform_button_save" class="disabled modal-action modal-close waves-effect waves-green btn-flat" onclick="ToolbarUserChangePassword.save()">Save</a>' +
          '<a href="#!" id="changepasswordform_button_close" class="modal-action modal-close waves-effect waves-green btn-flat" onclick="ToolbarUserChangePassword.closeModal()">Close</a>' +
        '</div>' +
      '</div>');
  },

  openModal: function() {
    this.loadData(function() {
      this.display();
      $('#changepasswordModal').openModal();
    }.bind(this));
  },

  closeModal: function() {
    $('#changepasswordModal').closeModal();
  },

  onchangePassword1: function() {
    $('#changepasswordform_password1').removeClass('valid');
    $('#changepasswordform_password1').removeClass('invalid');

    var password1 = $('#changepasswordform_password1').val();
    var password2 = $('#changepasswordform_password2').val();
    var result = this.validatePassword1(password1);
    if(!result.ok) {
      $('#changepasswordform_password1').addClass('invalid');
      $('#changepasswordform_password1_label').attr('data-error', result.message);
    } else {
      $('#changepasswordform_password1').addClass('valid');
    }
    if(password2 != null && password2 != '') {
      this.onchangePassword2();
    }
    this.activateButton();
  },

  onchangePassword2: function() {
    $('#changepasswordform_password2').removeClass('valid');
    $('#changepasswordform_password2').removeClass('invalid');

    var password1 = $('#changepasswordform_password1').val();
    var password2 = $('#changepasswordform_password2').val();
    var result = this.validatePassword2(password1, password2);
    if(!result.ok) {
      $('#changepasswordform_password2').addClass('invalid');
      $('#changepasswordform_password2_label').attr('data-error', result.message);
    } else {
      $('#changepasswordform_password2').addClass('valid');
    }
    this.activateButton();
  },
  
  validatePassword1: function(password1) {
    var ok, message;
    if (!password1.match(/.*[0-9]+.*/g)) {
      return {
        ok: false,
        message: 'Missing a number character'
      };
    }
    else if (!password1.match(/.*[A-Z]+.*/g)) {
      return {
        ok: false,
        message: 'Missing an uppercase character'
      };
    }
    else if (!password1.match(/.*[a-z]+.*/g)) {
      return {
        ok: false,
        message: 'Missing a lowercase character'
      };
    }
    else if (password1.length < 6) {
      return {
        ok: false,
        message: 'Too short (6 characters min)'
      };
    }
    else {
      return {
        ok: true
      }
    }
  },

  validatePassword2: function(password1, password2) {
    if(password1 !== password2) {
      return {
        ok: false,
        message: 'Passwords are not identicals'
      };
    } else {
      return {
        ok: true
      };
    }
    return {
      ok: ok,
      message: message
    };
  },

  validateForm: function() {
    var password1 = $('#changepasswordform_password1').val();
    var password2 = $('#changepasswordform_password2').val();
    var resultPassword1 = this.validatePassword1(password1);
    var resultPassword2 = this.validatePassword2(password1, password2);
    var ok =
      resultPassword1 != null && resultPassword1.ok
      && resultPassword2 != null && resultPassword2.ok;
    return ok;
  },

  activateButton: function() {
    if(this.validateForm()) {
      $('#changepasswordform_button_save').removeClass('disabled');
    } else {
      $('#changepasswordform_button_save').addClass('disabled');
    }
  },

  save: function() {
    var state = Store.getState();

    if(this.validateForm()) {
      var password1 = $('#changepasswordform_password1').val();
      state.account.password = password1;
      AuthService.saveAccount(state.account, function () {
        console.log('save account ok');
      }.bind(this));
    }
  }

};