var ToolbarGeneration = {

  init: function() {
    this.display();
  },

  display: function() {
    $('#generation').html(
      '<div id="generationModal" class="modal">' +
        '<div class="modal-content">' +
          '<h4>Generation</h4>' +
          '<div class="row">' +
            '<div class="input-field col s12">' +
              'Generation' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick="ToolbarGeneration.launchGeneration()">Generate</a>' +
          '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" onclick="ToolbarGeneration.closeModal()">Cancel</a>' +
        '</div>' +
      '</div>');
  },

  openModal: function() {
    $('#generationModal').openModal();
  },

  closeModal: function() {
    $('#generationModal').closeModal();
  },

  launchGeneration: function() {
    alert('launch');
    IDE.defineSplitEditorGenerate(40);
  }

};