const { MongoClient, ObjectId } = require('mongodb')

let _conn = null

function connect(url) {
    if (_conn != null) { return Promise.resolve(_conn) }

    return MongoClient.connect(url/*, { poolSize: 10 } */ )
        .then(conn => _conn = conn)
}

module.exports = {
    connect,
    connection: { conn: () => _conn},
    ObjectId
}