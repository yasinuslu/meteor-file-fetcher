var http = Npm.require('http');
var fs = Npm.require('fs');

FileFetcher.handle = function (doc) {
	try {
		var self = this;
		if(!self.settings.server) {
			return;
		}

		self.resolve(doc);

		if(!doc.path) {
			return;
		}

		if(doc.extension == "orgundefined") {
			throw {
				cause: "orgundefined extension caused by no-imdb"
			}
		}

		var filePath = this.settings.serverRoot + doc.path;

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
	} catch(err) {
		ExternalFiles.update(doc._id, {
			$set: {
				handled_at: new Date(),
				status: "error",
				error: err
			}
		});
	}
}

FileFetcher.unhandle = function (doc) {
	// console.log("unimplemented");
}

ExternalFiles._ensureIndex({"url": 1}, {unique: true});

Meteor.startup(function () {
	ExternalFiles.find({
		handled_at: null
	}).observe({
		added: function (document) {
			FileFetcher.handle(document);
		}
	});
});