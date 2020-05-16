const mysql = require("mysql");
const util = require("util");
const accounts = require("./account_data");
const transfers = require("./account_changes_data");

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "myBank",
});

const execQuery = util.promisify(
  connection.query.bind(connection)
);
connection.connect();

async function insertData() {
  try {
    accounts.forEach(async (data) => {
      await execQuery(
        "INSERT INTO account SET ?",
        data
      );
    });
    transfers.forEach(async (data) => {
      await execQuery(
        "INSERT INTO AccountChanges SET ?",
        data
      );
    });
  } catch (error) {
    console.log(error);
    connection.end();
  }
  connection.end();
}

insertData();
