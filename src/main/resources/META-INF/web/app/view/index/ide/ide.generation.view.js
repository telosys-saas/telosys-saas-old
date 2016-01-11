var IDEGeneration = {

  init: function() {
  },

  open: function() {
    var html =
      '<div id="generationContent"></div>';
    $('#generation').html(html);

    $('#editor').css( "display", "none");
    $('#settings').css( "display", "none");
    $('#bundles').css( "display", "none");
    $('#generation').css('display', 'block');

    this.loadData(function() {
      this.display();
    }.bind(this));
  },

  loadData: function(callback) {
    var state = Store.getState();

    ProjectsService.getBundlesOfProject(state.auth.userId, state.projectId, function(bundlesOfProject) {
      state.bundlesOfProject = bundlesOfProject;

      ProjectsService.getModel(state.auth.userId, state.projectId, state.modelName, function (model) {
        state.model = model;
        console.log(model);

        if (callback) {
          callback();
        }
      });
    });
  },

  display: function() {
    var state = Store.getState();

    var html =
      '<div id="settingsToolbar" class="editorToolbar">' +
        '<button id="buttonLaunchGeneration" class="waves-effect waves-green btn" onclick="IDEGeneration.submitGeneration()">' +
          '<span class="fa fa-play-circle fa-lg"></span> Generate' +
        '</button>' +
        ' &nbsp; ' +
        state.modelName +
      '</div>' +
      '<div class="row">' +
        '<div class="col s12"><h4>' + state.modelName + '</h4></div>';

    var model = state.model;
    if(model.parsingErrors == null || model.parsingErrors.length == 0) {
      html +=
        '<div class="col s6">' +
          '<h5>Entities</h5>' +
            '<div class="input-field">';

      for (var j = 0; j < model.entities.length; j++) {
        var entity = model.entities[j];
        html +=
          '<div>' +
            '<input type="checkbox" checked name="generation_entities" value="' + model.modelName + '/' + entity.fullName + '" id="' + model.modelName + '__' + entity.fullName + '" />' +
            '<label for="' + model.modelName + '__' + entity.fullName + '">' + entity.fullName + '</label>' +
          '</div>';
      }

      html +=
         '</div>' +
        '</div>' +
        '<div class="input-field col s6">' +
          '<h5>Templates bundles</h5>';

      for (var i = 0; i < state.bundlesOfProject.length; i++) {
        var bundle = state.bundlesOfProject[i];
        html +=
          '<div>' +
            '<input type="checkbox" name="generation_bundles" value="' + bundle.name + '" id="' + bundle.name + '" onclick="IDEGeneration.activateButton()" />' +
            '<label for="' + bundle.name + '">' + bundle.name + '</label>' +
          '</div>';
      }

      html +=
        '</div>';
    } else {
      html +=
        '<div class="col s12">' +
        '<h5>Entity errors</h5>' +
        '<table class="simple">' +
          '<tr>' +
            '<th>Model</th>' +
            '<th>Entity</th>' +
            '<th>Error</th>' +
          '</tr>';

      var hasError = false;
      if(state.models) {
        for (var i=0; i<state.models.length; i++) {
          var model = state.models[i];
          for (var j=0; j<model.parsingErrors.length; j++) {
            var parsingError = model.parsingErrors[j];
            hasError = true;
            html +=
              '<tr>' +
                '<td>' + model.name + '</td>' +
                '<td>' + parsingError.entityName + '</td>' +
                '<td>' + parsingError.message + '</td>' +
              '</tr>';
          }
        }
      }

      html +=
            '</table>' +
          '</div>' +
        '</div>';

    }

    $('#generationContent').html(html);
    this.activateButton();
  },

  close: function() {
    $('#generation').css('display', 'none');
  },

  activateButton: function() {
    var hasEntitySelected = false;
    var entitiesFields = document.getElementsByName('generation_entities');
    for(var i=0; i<entitiesFields.length; i++) {
      var entityField = entitiesFields[i];
      if(entityField.checked) {
        hasEntitySelected = true;
      }
    }
    var hasTemplateSelected = false;
    var bundlesFields = document.getElementsByName('generation_bundles');
    for(var i=0; i<bundlesFields.length; i++) {
      var bundleField = bundlesFields[i];
      if (bundleField.checked) {
        hasTemplateSelected = true;
      }
    }
    if(hasEntitySelected && hasTemplateSelected) {
      $('#buttonLaunchGeneration').disable(false);
    } else {
      $('#buttonLaunchGeneration').disable(true);
    }
  },

  submitGeneration: function() {
    var entitiesByModels = {};
    var entitiesFields = document.getElementsByName('generation_entities');
    for(var i=0; i<entitiesFields.length; i++) {
      var entityField = entitiesFields[i];
      if(entityField.checked) {
        var value = entityField.value;
        var model = value.substring(0,value.indexOf('/'));
        var entity = value.substring(value.indexOf('/')+1);
        if(entitiesByModels[model] == null) {
          entitiesByModels[model] = [];
        }
        entitiesByModels[model].push(entity);
      }
    }
    console.log('entitiesByModels', entitiesByModels);
    var bundles = [];
    var bundlesFields = document.getElementsByName('generation_bundles');
    for(var i=0; i<bundlesFields.length; i++) {
      var bundleField = bundlesFields[i];
      if(bundleField.checked) {
        bundles.push(bundleField.value);
      }
    }
    console.log('bundles', bundles);

    var state = Store.getState();
    state.generation = {
      entitiesByModels: entitiesByModels,
      bundles: bundles
    };

    this.launchGeneration();
  },

  launchGeneration: function() {
    var state = Store.getState();
    if(!state.generation) {
      return;
    }
    var entitiesByModels = state.generation.entitiesByModels;
    var bundles = state.generation.bundles;

    state.generationResults = [];
    var generations = [];
    for(var model in entitiesByModels) {
      var entities = entitiesByModels[model];
      for (var i = 0; i < bundles.length; i++) {
        var bundle = bundles[i];
        var generation = {
          model: model,
          entities: entities,
          bundle: bundle
        };
        console.log('generation: ', generation);
        generations.push(generation);
      }
    }

    // do only one generation at times
    var i = 0;
    if(i<generations.length) {
      var generation = generations[i];

      var launchGenerationCallback = (function launchGenerationCallback(result) {
        console.log(result);
        state.generationResults.push(result);
        IDEConsoleGeneration.display();

        // next generation
        i++;
        if (i < generations.length) {
          var generation = generations[i];
          ProjectsService.launchGeneration(state.auth.userId, state.projectId, generation, launchGenerationCallback);
        } else {
          this.launchGenerationCallbackEnd();
        }
      }.bind(this));

      ProjectsService.launchGeneration(state.auth.userId, state.projectId, generation, launchGenerationCallback);
    }
    //IDE.defineSplitEditorGenerate(40);
  },

  launchGenerationCallbackEnd: function() {
    IDETreeview.refreshAll();
    IDEWorkingFiles.refreshAll();
    IDEConsoleGeneration.display();

    var state = Store.getState();
    var hasError = false;
    for (var i=0; i<state.generationResults.length; i++) {
      var generationResult = state.generationResults[i];
      if (generationResult.errors && generationResult.errors.length > 0) {
        hasError = true;
      }
    }
    if(hasError) {
      Materialize.toast('Errors during generation', 4000, 'rounded red light-2');
    } else {
      Materialize.toast('Generation successfull', 4000, 'rounded green light-1');
    }
  }

};