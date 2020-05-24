var mysql = require("mysql");
const util = require("util");

var connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "userdb",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
	const create_authors_table = `CREATE TABLE authors(
    author_no int PRIMARY KEY,
    author_name text, 
    university text,
    date_of_birth date, 
    h_index int, 
    gender enum)`;

	const fk_Collaborator = `ALTER TABLE authors 
    ADD collaborator INT, 
    ADD CONSTRAINT 
    fk_Collaborator 
    FOREIGN KEY (collaborator) 
    REFERENCES authors(author_no)`;

	connection.connect();

	try {
		await Promise.all[
			(execQuery("DROP DATABASE IF EXISTS library"), execQuery("CREATE DATABASE library"))
		];

		await Promise.all[
			(execQuery("USE library"), (execQuery(create_authors_table), execQuery(fk_Collaborator)))
		];
	} catch (error) {
		console.error(error);
	}

	connection.end();
}

seedDatabase();
