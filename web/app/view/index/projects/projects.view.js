
var Projects = {

  init: function() {
    this.display();
  },

  display: function() {
    var html = '<div>' +
      '<h2>Projects</h2>' +
      '<div id="#projects"></div>' +
      '</div>';
    $('#main').html(html);
  }

};