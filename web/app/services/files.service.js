var FilesService = {

  getFilesForProject: function(projectId, callback) {
    $.ajax({
      url: host + "/api/rest/projects/"+projectId+"/folders",
      dataType: 'json'
    })
      .done(function (msg) {
        console.log(msg);
      })
      .success(function (msg) {
        console.log(msg);
        if (callback) {
          callback(msg);
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
      });
  },

  getFileForProject: function(projectId, fileId, callback) {
    $.ajax({
      url: host + "/api/rest/projects/"+projectId+"/files/"+fileId,
      dataType: 'json'
    })
      .done(function (msg) {
        console.log(msg);
      })
      .success(function (msg) {
        console.log(msg);
        if (callback) {
          callback(msg);
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
      });
  },

  createFolderForProject: function(projectId, folderId, folder, callback) {
    $.ajax({
      method: "POST",
      url: host + "/api/rest/projects/"+projectId+"/folders/"+folderId+"/subfolders",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(folder)
    })
      .done(function (msg) {
        console.log(msg);
      })
      .success(function (msg) {
        console.log(msg);
        if (callback) {
          callback(msg);
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
      });
  },

  createFileForProject: function(projectId, folderId, file, callback) {
    $.ajax({
      method: "POST",
      url: host + "/api/rest/projects/"+projectId+"/folders/"+folderId+"/files",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(file)
    })
      .done(function (msg) {
        console.log(msg);
      })
      .success(function (msg) {
        console.log(msg);
        if (callback) {
          callback(msg);
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
      });
  },

  saveFileForProject: function(projectId, file, callback) {
    $.ajax({
      method: "PUT",
      url: host + "/api/rest/projects/"+projectId+"/files/"+file.id,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(file)
    })
      .done(function (msg) {
        console.log(msg);
      })
      .success(function (msg) {
        console.log(msg);
        if (callback) {
          callback(msg);
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
      });
  },

  deleteFileForProject: function(projectId, fileId, callback) {
    $.ajax({
      method: "DELETE",
      url: host + "/api/rest/projects/"+projectId+"/files/"+fileId,
      dataType: 'json'
    })
      .done(function (msg) {
        console.log(msg);
      })
      .success(function (msg) {
        console.log(msg);
        if (callback) {
          callback(msg);
        }
      })
      .fail(function (jqXHR, textStatus) {
        console.log(textStatus);
      });
  },

  deleteFolderForProject: function(projectId, folderId, callback) {
  $.ajax({
    method: "DELETE",
    url: host + "/api/rest/projects/"+projectId+"/folders/"+folderId,
    dataType: 'json'
  })
    .done(function (msg) {
      console.log(msg);
    })
    .success(function (msg) {
      console.log(msg);
      if (callback) {
        callback(msg);
      }
    })
    .fail(function (jqXHR, textStatus) {
      console.log(textStatus);
    });
}
};