var Websocket = {

  init: function() {
    var state = Store.getState();
    if(state.auth.userId) {
      this.create();
    }
  },

  create: function() {
    var ws = new WebSocket("ws://127.0.0.1:8080/");

    ws.onopen = function () {
      console.log("Opened! ",document.cookie);
      ws.send(document.cookie);
    };

    ws.onmessage = function (evt) {
      console.log("Message: " + evt.data);
    };

    ws.onclose = function () {
      console.log("Closed!");
    };

    ws.onerror = function (err) {
      console.log("Error: " + err);
    };
  }

}