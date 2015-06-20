window.histograph = {
  prepareFlareData: function(historyItems) {
    var hash = {},
        root = {
          name: 'histograph',
          children: [],
        };

    // Create a hash for promises to resolve to;
    _.each(historyItems, function(hi) {
      hash[hi.id] = _.cloneDeep(hi);
      hash[hi.id].children = [];
      root.children.push(hash[hi.id]);

      var promise = new Promise(function(resolve, reject) {
        chrome.history.getVisits({url: hi.url}, function(items) {
          resolve(items);
        });
      })

      promise.then(function(items) {
        hash[items[0].id].children= items;
      });
    }, [root]);

    return root;
  }
};