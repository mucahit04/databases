const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "hyfuser",
	password: "hyfpassword",
	database: "library",
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
	//1- All research papers and the number of authors that wrote that paper.
	const rPapers_collaborators = `
  SELECT rp.paper_title, 
  COUNT(DISTINCT r.author_id) 
  AS 'Authors' FROM relation_table
  r RIGHT JOIN Research_Papers 
  rp ON rp.paper_id = r.paper_id 
  GROUP BY rp.paper_id;`;

	//2- Sum of the research papers published by all female authors.
	const sumPapersByFemale = `
    SELECT a.gender , COUNT(r.paper_id) 
    FROM relation_table r 
    INNER JOIN Authors a 
    on a.author_no = r.author_id 
    WHERE a.gender ='f';
    `;

	//3- Average of the h-index of all authors per university.
	const avrgHindexOfUniversity = `
    SELECT university, AVG(h_index) AS H_index_Average
    FROM Authors GROUP BY (university)`;

	//4- Sum of the research papers of the authors per university.
	const SumOfPapersPerUniversity = `
    SELECT A.university, 
    COUNT(DISTINCT AP.paper_id) 
    AS Sum_Of_Papers 
    FROM Relation_Table 
    AS AP JOIN Authors 
    AS A ON AP.author_id = A.author_no 
    GROUP BY(A.university)`;

	//5- Minimum and maximum of the h-index of all authors per university.
	const MinMaxHindexOfUniversity = `
    SELECT university, 
    MIN(h_index), 
    MAX(h_index)
    FROM Authors
    GROUP BY university`;

	connection.connect();
	try {
		console.log("All research papers and the number of authors that wrote that paper");
		console.log(await execQuery(rPapers_collaborators));
		console.log("Sum of the research papers published by all female authors");
		console.log(await execQuery(sumPapersByFemale));
		console.log("Average of the h-index of all authors per university");
		console.log(await execQuery(avrgHindexOfUniversity));
		console.log("Sum of the research papers of the authors per university");
		console.log(await execQuery(SumOfPapersPerUniversity));
		console.log("Minimum and maximum of the h-index of all authors per university");
		console.log(await execQuery(MinMaxHindexOfUniversity));
	} catch (error) {
		console.error(error);
	} finally {
		connection.end();
	}
}

seedDatabase();
