var connect = Npm.require("connect");
var fs = Npm.require("fs");
var oneMonth = 1000 * 60 * 60 * 24 * 30;

if(!fs.existsSync(FileFetcher.settings.serverPath)) {
	fs.mkdirSync(FileFetcher.settings.serverPath);
}

RoutePolicy.declare(FileFetcher.settings.webPath, 'network');

WebApp
	.connectHandlers
	.use(
		FileFetcher.settings.webPath,
		connect.static(FileFetcher.settings.serverPath, { maxAge: oneMonth })
	);