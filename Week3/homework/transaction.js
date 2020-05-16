const mysql = require("mysql");
const util = require("util");

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "myBank",
});

const execQuery = util.promisify(
  connection.query.bind(connection)
);

async function transaction() {
  connection.connect();

  try {
    await execQuery("SET autocommit = 0");
    await execQuery("START TRANSACTION");
    await execQuery(
      `UPDATE account SET balance = balance - 1000 WHERE account_number = 101`
    );
    await execQuery(
      `UPDATE account SET balance = balance + 1000 WHERE account_number = 102`
    );
    await execQuery(
      `INSERT INTO AccountChanges SET ?`,
      {
        change_number: 1003,
        account_number: 101,
        amount: -1000,
        changed_date: "2020-04-30",
        remark: "Birthday gift",
      }
    );
    await execQuery(
      `INSERT INTO AccountChanges SET ?`,
      {
        change_number: 1004,
        account_number: 102,
        amount: 1000,
        changed_date: "2020-04-30",
        remark: "Birthday gift",
      }
    );
    await execQuery("COMMIT");
  } catch (error) {
    await execQuery("ROLLBACK"); //in case of error take the changes back
    console.error(error);
    connection.end();
  }

  connection.end();
}

transaction();
