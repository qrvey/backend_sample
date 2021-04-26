const Connection = require('../lib/connection');

const getConnections = function (req, res, next) {

    Connection.getConnections()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error);
        });
};

return {
    getConnections,
};