var Hapi = require('hapi');
var hbs = require('handlebars');

var port = 8000;
var server = new Hapi.Server();
server.connection({ port: 8000 });

// Views Manager
server.views({
    'engines': {
        'mustache': { 'module': hbs },
        'html': { 'module': hbs }
    },
    'path': __dirname + '/views',
    'partialsPath': __dirname + '/views/partials',
    'defaultExtension': 'mustache'
});

// Routes
server.route(require('./routes/static.js'));
server.route(require('./routes/index.js'));

server.start();
console.log('Iris Web listening on port ' + port);