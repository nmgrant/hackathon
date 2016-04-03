let startup = () => {
	_setEnvironmentVariables();
	_setBrowserPolicies();
	_generateAccounts();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {
	BrowserPolicy.content.allowOriginForAll('*.googleapis.com');
	BrowserPolicy.content.allowOriginForAll('*.gstatic.com');
	BrowserPolicy.content.allowEval('https://ajax.googleapis.com');
	BrowserPolicy.content.allowOriginForAll('*.googlecode.com');
	BrowserPolicy.content.allowOriginForAll('https://*.soundcloud.com');
	BrowserPolicy.content.allowOriginForAll('https://*.sndcdn.com');
};

var _generateAccounts = () => Modules.server.generateAccounts();

Modules.server.startup = startup;