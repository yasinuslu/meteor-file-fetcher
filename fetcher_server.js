var http = Npm.require('http');
var fs = Npm.require('fs');

FileFetcher.handle = function (doc) {
	var self = this;
	if(!self.settings.server) {
		return;
	}

	var filePath = this.settings.serverPath + "/" + doc._id + "." + doc.extension;

	var file = fs.createWriteStream(filePath);
	var cb = Meteor.bindEnvironment(function (response) {
		response.pipe(file);

		ExternalFiles.update(doc._id, {
			$set: {
				handled_at: new Date()
			}
		})
	});

	var request = http.get(doc.url, cb);
}

FileFetcher.unhandle = function (doc) {
	// console.log("unimplemented");
}

ExternalFiles._ensureIndex({"url": 1}, {unique: true});

ExternalFiles.find({
	handled_at: null
}).observe({
	added: function (document) {
		FileFetcher.handle(document);
	}
});