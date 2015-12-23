
var IDETreeview = {
  init: function() {
    var state = Store.getState();
    FilesService
      .getFilesForProject(state.auth.userId, state.projectId)
      .then(function(rootFolder) {
        state.tree = {};
        var root = this.convertFolderToJson(rootFolder, null);
        state.tree.root = root;
        $('#jstree').html('<div id="jstreecontent" class="treeview"></div>');
        $('#jstreecontent').jstree({
          'core': {
            'data': [
              root
            ],
            // so that create works
            "check_callback" : true
          },
          "types" : {
            "folder" : {
              "icon" : "fa fa-folder-o"
            },
            "file" : {
              "icon" : "fa fa-file-text-o"
            }
          },
          "contextmenu": {
            // Customize context menu items : http://stackoverflow.com/questions/21096141/jstree-and-context-menu-modify-items
            "items": function(node) {
              var tree = $("#jstreecontent").jstree(true);
              /*
               separator_before - a boolean indicating if there should be a separator before this item
               separator_after - a boolean indicating if there should be a separator after this item
               _disabled - a boolean indicating if this action should be disabled
               label - a string - the name of the action (could be a function returning a string)
               action - a function to be executed if this item is chosen
               icon - a string, can be a path to an icon or a className, if using an image that is in the current directory use a ./ prefix, otherwise it will be detected as a class
               shortcut - keyCode which will trigger the action if the menu is open (for example 113 for rename, which equals F2)
               shortcut_label - shortcut label (like for example F2 for rename)
               */
              console.log(node);
              var items = {};
              if(node.type == 'folder') {
                items.CreateFile = {
                  label: "Create file",
                  action: this.onCreateFile(node, tree)
                };
                items.CreateFolder = {
                  label: "Create folder",
                  action: this.onCreateFolder(node, tree)
                };
              }
              /*
              if(node.type == 'file') {
                items.Copy = {
                  "separator_before": true,
                  "separator_after": false,
                  "label": "Copy",
                  "action": this.onCopy(node, tree)
                };
              }
              if(node.type == 'folder') {
                var state = Store.getState();
                if(state.tree.copy) {
                  items.Paste = {
                    "separator_before": true,
                    "separator_after": false,
                    "label": "Paste "+state.tree.copy,
                    "action": this.onPaste(node, tree)
                  };
                }
              }
              */
              /*
              items.Rename = {
                "separator_before": true,
                "separator_after": false,
                "label": "Rename",
                "action": this.onRename(node, tree)
              };
              */
              items.Remove = {
                "separator_before": false,
                "separator_after": false,
                "label": "Remove",
                "action": this.onRemove(node, tree)
              };
              return items;
            }.bind(this)
          },
          "plugins" : [ "contextmenu", "types" ]
        });
        // For DoubleClick detection : http://stackoverflow.com/questions/3674625/how-can-i-attach-custom-behaviour-to-a-double-click-in-jstree
        state.tree.selected = null;
        // single click
        $('#jstreecontent').on("changed.jstree", function(e, data) {
          state.tree.selected = {
            e: e,
            data: data
          };
          this.onClick(e, data);
        }.bind(this));
        // double click
        $('#jstreecontent').bind("dblclick.jstree", function () {
          if (state.tree.selected) {
            this.onDoubleClick(state.tree.selected.e, state.tree.selected.data);
          }
        }.bind(this));
      }.bind(this));
  },

  onClick: function(e, data) {
    console.log('onClick');

  },

  onDoubleClick: function(e, data) {
    console.log('onDoubleClick');
    if(data.node.type == 'file') {
      var state = Store.getState();
      state.fileId = data.node.id;
      IDEEditor.loadFile();
    }
  },

  onCreateFile: function(nodeParent, tree) {
    return (function (obj) {
      node = tree.create_node(nodeParent);
      node.type = 'file';
      tree.edit(node, null, function(node, status) {
        var state = Store.getState();
        var projectId = state.projectId;
        if (nodeParent.id == '@@_root_@@') {
          var file = {
            id: node.text,
            name: node.text,
            folderParentId: ''
          };
        } else {
          var file = {
            id: nodeParent.id + '/' + node.text,
            name: node.text,
            folderParentId: nodeParent.id
          };
        }
        FilesService.createFileForProject(state.auth.userId, projectId, file, function(folder) {
          console.log('file created', file);
        });
      });
    });
  },

  onCreateFolder: function(nodeParent, tree) {
    return (function (obj) {
      node = tree.create_node(nodeParent);
      node.type = 'folder';
      tree.edit(node, null, function(node, status) {
        var state = Store.getState();
        var projectId = state.projectId;
        if (nodeParent.id == '@@_root_@@') {
          var folder = {
            id: node.text,
            name: node.text,
            folderParentId: ''
          };
        } else {
          var folder = {
            id: nodeParent.id + '/' + node.text,
            name: node.text,
            folderParentId: nodeParent.id
          };
        }
        FilesService.createFolderForProject(state.auth.userId, projectId, folder, function(folder) {
          console.log('folder created', folder);
        });
      });
    });
  },

  onRemove: function(node, tree) {
    return (function(obj) {
      tree.delete_node(node);
      var state = Store.getState();
      if(node.type == 'file') {
        var fileId = node.id;
        FilesService.deleteFileForProject(state.auth.userId, state.projectId, fileId, function() {
          console.log("File '"+node.id+"' deleted");
        });
      }
      if(node.type == 'folder') {
        var folderId = node.id;
        FilesService.deleteFolderForProject(state.auth.userId, state.projectId, folderId, function() {
          console.log("Folder '"+node.id+"' deleted");
        });
      }
    }.bind(this));
  },

  onRename: function(node, tree) {
    return (function (obj) {
      tree.edit(node);
    }).bind(this);
  },

  onCopy: function(node, tree) {
    return (function(obj) {
      tree.copy(node);
      var state = Store.getState();
      state.tree.copy = node.text;
    }.bind(this));
  },

  onPaste: function(node, tree) {
    return (function(obj) {
      var state = Store.getState();
      if(state.tree.copy) {
        tree.paste(node);
      }
      delete state.tree.copy;
    }.bind(this));
  },

  convertFolderToJson: function(folder, parent) {
    console.log('folder : ', folder.name);
    var currentNode = {
      id: (folder.id) ? folder.id : '@@_root_@@',
      text: folder.name,
      type: 'folder',
      children: []
    };

    if(!parent) {
      currentNode.state = {
        'opened' : true
      };
    }

    if(folder.folders) {
      for (var i = 0; i < folder.folders.length; i++) {
        var folderSub = folder.folders[i];
        var folderSubNode = this.convertFolderToJson(folderSub, currentNode);
        currentNode.children.push(folderSubNode);
      }
    }

    if(folder.files) {
      for (var i = 0; i < folder.files.length; i++) {
        var file = folder.files[i];
        var fileNode = this.convertFileToJson(file, currentNode);
        currentNode.children.push(fileNode);
      }
    }

    return currentNode;
  },

  convertFileToJson: function(file, parent) {
    var currentNode = {
      id: file.id,
      text: file.name,
      type: 'file'
    };

    return currentNode;
  }

};
