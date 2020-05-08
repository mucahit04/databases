var mysql = require("mysql");
var meetup_data = require("./meetup_data");

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

function stop_when_error(error, results, fields) {
  if (error) {
    throw error;
  }
}

//drop database meetup if exists
connection.query("DROP DATABASE IF EXISTS meetup", stop_when_error);

//creating the meetup database and querying it to mysql
var create_database = "create database meetup";

connection.query(create_database, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("database meetup created");
});

var use_meetup = "use meetup;";

connection.query(use_meetup, function (error, results, fields) {
  if (error) {
    throw error;
  }
  console.log("meetup in use");
});

//creating invitee table
var create_table_invitee =
  "create table Invitee (invitee_no int, invitee_name varchar(50), invited_by varchar(50))";
connection.query(create_table_invitee, function (
  error,
  results,
  fields
) {
  if (error) {
    throw error;
  }
  console.log("table invitee created ");
});

//inserting invitees data into invitee table
meetup_data.invitees.forEach((person) => {
  let add_invitee_row = `INSERT INTO Invitee VALUES (${person.invitee_no}, "${person.invitee_name}", "${person.invited_by}")`;
  connection.query(add_invitee_row, stop_when_error);
  console.log(`invitee${person.invitee_no} added`);
});

//create room table
var create_table_room =
  "create table room (room_no int, room_name text, floor_number text)";
connection.query(create_table_room, function (
  error,
  results,
  fields
) {
  if (error) {
    throw error;
  }
  console.log("table room created ");
});

//inserting rooms data into room table
meetup_data.rooms.forEach((room) => {
  let add_room_row = `INSERT INTO room VALUES (${room.room_no}, "${room.room_name}", ${room.floor_number})`;
  connection.query(add_room_row, stop_when_error);
  console.log(`room${room.room_no} added`);
});

//create meeting table
var create_table_meeting =
  "create table meeting (meeting_no int, meeting_title text, starting_time TIME, ending_time TIME,room_no int)";
connection.query(create_table_meeting, function (
  error,
  results,
  fields
) {
  if (error) {
    throw error;
  }
  console.log("table meeting created ");
});

//inserting meetings data into meeting table
meetup_data.meetings.forEach((meeting) => {
  let add_meeting_row = `INSERT INTO meeting VALUES (${meeting.meeting_no}, 
      "${meeting.meeting_title}", "${meeting.starting_time}","${meeting.ending_time}","${meeting.room_no}")`;
  connection.query(add_meeting_row, stop_when_error);
  console.log(`meeting${meeting.meeting_no} added`);
});

connection.end();
