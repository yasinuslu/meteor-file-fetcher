Package.describe({
    summary: "Fetch and store files from url"
});

Npm.depends({
  "connect": "2.9.0"
});

Package.on_use(function(api) {
  var both = ["client", "server"];

  api.use(["mongo-livedata", "underscore"], both);
  api.use(["routepolicy", "webapp"], "server");

  api.add_files("fetcher.js", "server");

  api.add_files("config.js", "server");

  api.add_files("fetcher_server.js", "server");

  api.add_files("server.js", "server");

  if(typeof api.export !== 'undefined') {
    api.export("FileFetcher", both);
    api.export("ExternalFiles", both);
  }

});
