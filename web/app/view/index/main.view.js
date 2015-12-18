var Main = {
  init: function() {
    Store.init()
      .then(function() {
        Toolbar.init();
        IDE.init();
      });
  }
};
