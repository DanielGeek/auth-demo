const mysql = require('mysql2');

const dbConnection = () => {
	try {
		const pool = mysql.createPool({
			host: process.env.HOST,
			user: process.env.USER,
			password: process.env.PASSWORD,
			database: process.env.DB,
			waitForConnections: true,
			connectionLimit: 100,
			queueLimit: 0
		});

		pool.getConnection((err, connection) => {
			if (err) {
				console.log('Error when trying to connect to the database', err);
				setTimeout(dbConnection, 2000);
			} else {
				console.log('MySQL DB Online');
				connection.release();
			}
		});

		pool.on('error', (err) => {
			console.log('db error', err);

			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.log('The error is ', err.code);
				// Connection to the MySQL server is usually lost due to either server restart or a connection timeout
				dbConnection();
			} else if (err.code === 'ECONNRESET') {
				console.log('The error is ', err.code);
				dbConnection();
			} else {
				// Connection idle timeout (the wait_timeout server variable configures this)
				throw err;
			}
		});

		return pool;
	} catch (error) {
		console.log(error);
		throw new Error('Error when initializing DB');
	}
};

module.exports = {
	dbConnection
};
