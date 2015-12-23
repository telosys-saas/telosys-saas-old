var IDEGenerate = {

  init: function() {
    this.display();
  },

  display: function() {
    var html =
      '<div>' +
        '<button class="btn blue" id="generateButton" onclick="IDEGenerate.launchGeneration()">Generate</button>' +
      '</div>' +
      '<div id="generateResult">' +
      '</div>';
    $('#generate').html(html);
  },

  launchGeneration: function() {
    $('#generateButton').css('disabled', true);

    var state = Store.getState();
    ProjectsService.launchGeneration(state.auth.userId, state.projectId, function(result) {
      console.log("Generation complete - result : ", result);
      $('#generateButton').css('disabled', false);
      if(result.numberOfGenerationErrors != 0) {
        var html =
            '<h5 class="red-text">' +
              'Error : '+result.numberOfGenerationErrors+' generation error'+
              ((result.numberOfGenerationErrors > 1) ? 's':'') +
            '</h5>';
      } else {
        var html =
            '<h5 class="green-text">' +
              'Success : ' + result.numberOfFilesGenerated + ' file' +
              ((result.numberOfFilesGenerated > 1) ? 's':'') +
              ' generated</h5>' +
            '<ul>' +
              '<li>' + result.numberOfResourcesCopied + ' resource' +
                ((result.numberOfResourcesCopied > 1) ? 's':'') +
                ' copied</li>' +
              '<li>' + result.numberOfFilesGenerated + ' file' +
                ((result.numberOfFilesGenerated > 1) ? 's':'') +
                ' generated</li>' +
              '<li>' + result.numberOfGenerationErrors + ' generation error' +
                ((result.numberOfGenerationErrors > 1) ? 's':'') +
                '</li>' +
            '</ul>';
      }

      if(result.errors) {
        html += '<ul class="collapsible" data-collapsible="accordion">';

        for (var i = 0; i < result.errors.length; i++) {
          var error = result.errors[i];
          var title = error.messageBody.substring(0, error.messageBody.indexOf('\n'));
          var content = error.messageBody.substring(error.messageBody.indexOf('\n')+1);
          html +=
            '<li>' +
              '<div class="collapsible-header red lighten-4'+((i==0)?' active':'')+'">' +
                '<i class="material-icons">error_outline</i>'+title+
              '</div>' +
              '<div class="collapsible-body"><pre>'+content+'</pre></div>' +
            '</li>';
        }

        html += '</ul>';
      }

      $('#generateResult').html(html);
      if(result.errors) {
        $('#generateResult .collapsible').collapsible({
          accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
      }
    })
  }

};