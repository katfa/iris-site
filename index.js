var Hapi = require('hapi');
var hbs  = require('handlebars');
var path = require('path');
var Joi = require('joi');

var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var server = new Hapi.Server();
server.connection({
    host: process.env.OPENSHIFT_NODEJS_IP || 'localhost',
    port: port
});

// Views Manager
server.views({
    'engines': {
        'mustache': { 'module': hbs },
        'html': { 'module': hbs }
    },
    'path': path.join(__dirname, 'views'),
    'partialsPath': path.join(__dirname, 'views/partials'),
    'defaultExtension': 'mustache'
});


// Routes
var assetRoute = require('./routes/static.js');
server.route(assetRoute);

server.route(require('./routes/index.js'));
server.route(require('./routes/sendmail.js'));

var localeSetRoute = {
	method: 'GET',
	path: '/locale/{_locale}',
	config: {
		validate: {
			params: {
				_locale: Joi.string().required()
			}
		},
		handler: function (req, rep) {
			rep.redirect(req.info.referrer).state('_locale', req.params._locale);
		}
	}
};
server.route(localeSetRoute);

// Localization plug-in
server.register(
    {
        register: require('hapi-l10n-gettext'),
        options: {
            cookieName: '_locale',
            l10nDirectory: path.resolve(__dirname, 'locales'),
            // optional (default 'en') - language used when neither the cookie nor the
            // accept-language header are present
            defaultLocale: 'nb',
            // optional: routes to exclude from localization
            excludedRoutes: [assetRoute, localeSetRoute],
            includedRoutes: [require('./routes/index.js')]
        }
    },
    function (err) {
		if (err) throw err;
		server.start(function () {
        	server.log('info', 'Server running at: ' + server.info.uri);
    	});
	}
);