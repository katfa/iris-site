module.exports = {
    method: 'GET',
    path: '/files/{param*}',
    handler: {
        directory: {
            path: [
                'public',
            ]
        }
    }
};