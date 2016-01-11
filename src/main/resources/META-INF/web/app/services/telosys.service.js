
function encodeFileId(fileId) {
  return fileId.replace(/\//g,'%2F').replace(/\\/g,'%5C');
}

function encodeFolderId(fileId) {
  return fileId.replace(/\//g,'%2F').replace(/\\/g,'%5C');
}

var TelosysService = {

  getTelosysFolderForProject: function(userId, projectId, callback) {
    var deferred = Q.defer();

    $.ajax({
      url: host + "/api/v1/users/"+userId+"/projects/"+projectId+"/telosys",
      dataType: 'json'
    })
      .success(function (msg) {
        deferred.resolve(msg);
      })
      .fail(function (jqXHR, textStatus) {
        deferred.fail(textStatus);
      });

    return deferred.promise;
  }

};