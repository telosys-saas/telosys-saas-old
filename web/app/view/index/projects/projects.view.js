
var Projects = {

  init: function() {
    this.display();
    ProjectsList.init();
  },

  display: function() {
    var html = '<div>' +
      '<h2>Projects</h2>' +
      '<div id="projects">Projects</div>' +
      '</div>';
    $('#main').html(html);
  }

};