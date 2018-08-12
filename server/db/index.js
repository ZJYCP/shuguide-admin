//mysql数据库连接

const mysql = require('mysql');

const POOL = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'1111',
  database:'blog',
});

module.exports = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      POOL.getConnection(function(err, connection) {
        if (err) {
          resolve( err )
        } else {
          connection.query(sql, values, ( err, data) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( data )
            }
            connection.release()
          })
        }
      })
    });
}