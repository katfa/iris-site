var moment = require('moment-timezone');
module.exports = {
    method: 'GET',
    path: '/',
    handler: function (req, rep) {
        var time = moment.tz(Date.now(), "Europe/Oslo").format('h:m a z');
        rep.view('index', {time: time});
    }
};