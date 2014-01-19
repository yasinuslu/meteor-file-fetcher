var connect = Npm.require("connect");
var fs = Npm.require("fs");

if(!fs.existsSync) {
	fs.mkdirSync(FileFetcher.settings.serverPath);
}

RoutePolicy.declare(FileFetcher.settings.webPath, 'network');

WebApp
	.connectHandlers
	.use(
		FileFetcher.settings.webPath,
		connect.static(FileFetcher.settings.serverPath)
	);