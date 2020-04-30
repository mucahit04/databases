var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect();

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

var invitees = [
  {
    invitee_no: 1,
    invitee_name: "James",
    invited_by: "John",
  },
  {
    invitee_no: 2,
    invitee_name: "Aysha",
    invited_by: "Daniel",
  },
  {
    invitee_no: 3,
    invitee_name: "Dennis",
    invited_by: "Sean",
  },
  {
    invitee_no: 4,
    invitee_name: "Henry",
    invited_by: "Sean",
  },
  {
    invitee_no: 5,
    invitee_name: "Dana",
    invited_by: "Christine",
  },
];

//inserting invitees data into invitee table
invitees.forEach((person) => {
  let add_invitee_row = `INSERT INTO Invitee VALUES (${person.invitee_no}, "${person.invitee_name}", "${person.invited_by}")`;
  connection.query(add_invitee_row, function (
    error,
    results,
    fields
  ) {
    if (error) {
      throw error;
    }
    console.log(`invitee${person.invitee_no} added`);
  });
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

var rooms = [
  {
    room_no: 1,
    room_name: "Bangkok",
    floor_number: "1",
  },
  {
    room_no: 2,
    room_name: "Rome",
    floor_number: "2",
  },
  {
    room_no: 3,
    room_name: "Amsterdam",
    floor_number: "3",
  },
  {
    room_no: 4,
    room_name: "Paris",
    floor_number: "4",
  },
  {
    room_no: 5,
    room_name: "Cairo",
    floor_number: "5",
  },
];

//inserting rooms data into room table
rooms.forEach((room) => {
  let add_room_row = `INSERT INTO room VALUES (${room.room_no}, "${room.room_name}", ${room.floor_number})`;
  connection.query(add_room_row, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(`room${room.room_no} added`);
  });
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

var meetings = [
  {
    meeting_no: 1,
    meeting_title: "Finance",
    starting_time: "11:00:00",
    ending_time: "12:30:00",
    room_no: 1,
  },
  {
    meeting_no: 2,
    meeting_title: "King's Day",
    starting_time: "10:00:00",
    ending_time: "11:30:00",
    room_no: 2,
  },
  {
    meeting_no: 3,
    meeting_title: "Deparment",
    starting_time: "15:00:00",
    ending_time: "16:30:00",
    room_no: 3,
  },
  {
    meeting_no: 4,
    meeting_title: "IT",
    starting_time: "09:00:00",
    ending_time: "10:00:00",
    room_no: 4,
  },
  {
    meeting_no: 5,
    meeting_title: "Salary",
    starting_time: "13:00:00",
    ending_time: "14:00:00",
    room_no: 5,
  },
];

//inserting meetings data into meeting table
meetings.forEach((meeting) => {
  let add_meeting_row = `INSERT INTO meeting VALUES (${meeting.meeting_no}, 
      "${meeting.meeting_title}", "${meeting.starting_time}","${meeting.ending_time}","${meeting.room_no}")`;
  connection.query(add_meeting_row, function (
    error,
    results,
    fields
  ) {
    if (error) {
      throw error;
    }
    console.log(`meeting${meeting.meeting_no} added`);
  });
});

connection.end();
