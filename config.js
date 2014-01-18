var path = Npm.require('path');

var bundleRoot = path.join(process.mainModule.filename, '..');
var rootDir = path.join(bundleRoot, '..') + path.sep;
var serverPath = path.join(rootDir, 'mfs');

_.extend(FileFetcher, {
	settings: {
		webPath: "/mfs",
		serverPath: serverPath
	},

	config: function (options) {
		_.extend(this.settings, options);
	}
});