module.exports = {
    method: 'GET',
    path: '/',
    handler: function (req, rep) {
        rep.view('index');
    }
};