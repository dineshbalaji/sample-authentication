let pg = require("pg");
const connectionString = 'postgresql://postgres:123@localhost:5432/UserAccount'

function getPool() {
    var pool;
    return (function () {
        if (pool)
            return pool;
        else {
            pool = new pg.Pool({ connectionString: connectionString });
            pool.on('error', (error) => {
                console.error('Error on PostgresPool connection', error);
            });
            return pool;
        }
    }());
}

function getUser(name) {

    return new Promise((resolve, reject) => {

        getPool().connect((err, clinet, done) => {
            if (err) throw err;
            clinet.query("select * from getuser($1)", [name], (err, res) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(res.rows[0]);
                }
                done();
            });
        });
    })
};

module.exports = {
    getUser
}
