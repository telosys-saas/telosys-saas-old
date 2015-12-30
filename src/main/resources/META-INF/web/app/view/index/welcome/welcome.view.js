var Welcome = {

  init: function() {
    this.display();
  },

  display: function() {
    $.get('app/view/index/welcome/welcome.html', function(html) {
      $('#main').html(html);
      $('#main .parallax').parallax();
      $('#login').html(Login.getDisplayHtml());
      $('footer').hide();

      var options = [{
        selector: '#workflow-step1',
        offset: 400,
        callback: 'Materialize.showStaggeredList("workflow-step1")'
      }];
      Materialize.scrollFire(options);
    });
  }

};