ExternalFiles = new Meteor.Collection("external_files");

FileFetcher = {
	defaults: {
		handled_at: null
	},

	resolve: function (file) {
		// TODO: handle url without extension
		file.extension = file.url.split(".").pop();
		file.path = this.settings.webPath + "/" + file._id + "." + file.extension;

		ExternalFiles.update(file._id, {
			$set: {
				extension: file.extension,
				path: file.path
			}
		});
	},

	add: function (url, options) {
		var self = this;

		options = options || {};

		_.defaults(options, self.defaults);

		var file = { url: url };

		_.extend(file, options);

		// url is unique, mongodb will handle it for us
		var f = self.get(file.url);
		if(!f) {
			file._id = ExternalFiles.insert(file);
		} else {
			file = f;
		}

		self.resolve(file);

		return file;
	},

	path: function (id) {
		var file = this.get(id);

		return this.settings.webPath + "/" + file._id + "." + file.extension;
	},

	get: function (id) {
		var file = ExternalFiles.findOne(id);
		if(!file) {
			file = ExternalFiles.findOne({
				"url": id
			});
		}

		return file;
	}
}