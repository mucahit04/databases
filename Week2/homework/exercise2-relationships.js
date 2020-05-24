var mysql = require("mysql");
var authors = require("./authors-data");
var papers = require("./papers-data");
const util = require("util");
const collaborators = require("./collaborator-data");
const relation_data = require("./relation_table_data");

var connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "library",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
	const create_papers_table = `CREATE TABLE 
    IF NOT EXISTS 
    Research_Papers (
    paper_id INT PRIMARY KEY, 
    paper_title TEXT, 
    conference TEXT, 
    publish_date DATE)`;

	const create_relation_table = `CREATE TABLE 
    IF NOT EXISTS 
    Relation_Table (
    author_id INT, 
    paper_id INT, 
    CONSTRAINT FK_Author 
    FOREIGN KEY(author_id) 
    REFERENCES authors(author_no), 
    CONSTRAINT FK_Paper 
    FOREIGN KEY(paper_id) 
    REFERENCES Research_Papers(paper_id), 
    CONSTRAINT PK_Author_Paper 
    PRIMARY KEY(author_id, paper_id))`;

	function random_collab_number() {
		return 101 + Math.floor(Math.random() * collaborators.length);
	}

	connection.connect();

	try {
		await execQuery(create_papers_table);
		await execQuery(create_relation_table);

		authors.forEach(async author => {
			await execQuery("INSERT INTO authors SET ?", author);
		});

		papers.forEach(async paper => {
			await execQuery("INSERT INTO Research_Papers SET ?", paper);
		});

		relation_data.forEach(async data => {
			await execQuery("INSERT INTO Relation_Table SET ?", data);
		});

		collaborators.map(async value => {
			await execQuery(
				`UPDATE Authors SET collaborator = ${random_collab_number()} WHERE author_no = ${value}`
			);
		});
	} catch (error) {
		console.error(error);
		connection.end();
	} finally {
		connection.end();
	}
}

seedDatabase();
