(function() {
  commands.addUserCommand(['rewind'], 'Rewind', function(args) {
    rewind(args.count);
  },
    {
      argCount: "0",
      count: true,
      literal: 0
    });

  function rewind(count) {
    if (!window.getWebNavigation().canGoBack) {
      liberator.echomsg("Removing tab: " + (tabs.index() + 1) + ": " + buffer.title);
      tabs.remove(tabs.getTab(), 1, 0, 0);
      return;
    }
    if (count == "0") {
      return;
    }
    if (count == "" || count == null || count == undefined) {
      count = 1;
    }

    var ses = history.session;
    var curHost = ses[ses.index].URI.host;
    var n = 0;
    for (var i = ses.index - 1; i >= 0; i--) {
      if (curHost == ses[i].URI.host) {
        continue;
      }
      n++;
      if (n == count) {
        break;
      }
      curHost = ses[i].URI.host;
    }

    if (n == 0 || n < count) {
      liberator.echomsg("Removing tab: " + (tabs.index() + 1) + ": " + buffer.title);
      tabs.remove(tabs.getTab(), 1, 0, 0);
    } else {
      window.getWebNavigation().gotoIndex(i);
    }
  }
})();
