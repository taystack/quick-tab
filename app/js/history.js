window.histograph = {
  stringToColor: function(str) {
    // str to hash
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));

    // int/hash to hex
    for (var i = 0, color = "#"; i < 3; color += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));

    return color;
  },
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
      hash[hi.id].size = 1;
      root.children.push(hash[hi.id]);

      if (hi.url) {
        var promise = new Promise(function(resolve, reject) {
          chrome.history.getVisits({url: hi.url}, function(items) {
            _.each(items, function(item) {item.size = 1;})
            resolve(items);
          });
        })

        promise.then(function(items) {
          hash[items[0].id].children= items;
        });
      }
    }, [root]);

    return root;
  }
};
