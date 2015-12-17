var FilesService = {

  getFilesForProject: function(projectId, callback) {
    $.ajax({
      url: host + "/api/rest/projects/"+projectId,
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

  getFileForProject: function(projectId, folderId, fileId, callback) {
    $.ajax({
      url: host + "/api/rest/projects/"+projectId+"/folder/"+folderId+"/files/"+fileId,
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