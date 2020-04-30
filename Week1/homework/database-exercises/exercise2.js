var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

//using the world database
connection.query("use world;", function (error, results, fields) {
  if (error) throw error;
  console.log("database world in use");
});

//putting question queries in an object to make more readable
//I comment out them so they can be checked one by one, by removing comment symbols
const queries = {
  country_larger_8mil:
    "SELECT name from country WHERE Population > 8000000;",
  // country_name_has_land:
  //   "SELECT name FROM country WHERE name LIKE '%land%';",
  // cities_between_500k_1mil:
  //   "SELECT name from city WHERE Population > 500000 and 1000000;",
  // country_name_has_land:
  //   "SELECT name from country WHERE continent='europe';",
  // order_country_surfaceArea_desc:
  //   "SELECT * FROM country ORDER BY SurfaceArea DESC;",
  // cities_of_netherlands:
  //   "SELECT name FROM city WHERE CountryCode='NLD';",
  // population_of_rotterdam:
  //   "SELECT population from city WHERE name='Rotterdam';",
  // top_ten_country_by_surface:
  //   "SELECT name FROM country ORDER BY SurfaceArea desc LIMIT 10;",
  // top_ten_city_by_population:
  //   "SELECT name FROM city ORDER BY population desc LIMIT 10;",
  // world_population: "SELECT SUM (population) FROM country;",
};

//getting all queries in the queries object run
for (let query in queries) {
  connection.query(queries[query], function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });
}

connection.end();
