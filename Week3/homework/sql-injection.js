const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect();

//instead of typing code of a country, one can add '1=1' and use advantage of sql-injection
function getPopulation(Country, name, code, cb) {
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}' OR 1=1`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0)
        cb(new Error("Not found"));
      cb(null, result);
    }
  );
}
getPopulation(
  "Country",
  "AHJSAB",
  "sdfhds",
  function (err, result) {
    if (err) throw err;
    console.log(result);
  }
);

// to fix that we should hide some part of the code:
function getPopulationNoInjection(
  Country,
  name,
  code,
  cb
) {
  connection.query(
    `SELECT Population FROM ?? WHERE Name = ? and code = ?`,
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0)
        cb(new Error("No such country"));
      cb(null, result);
    }
  );
}
getPopulationNoInjection(
  "Country",
  "Thailand",
  "sdgfsd",
  function (err, result) {
    if (err) throw err;
    console.log(result);
  }
);

connection.end();
