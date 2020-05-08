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

module.exports.invitees = invitees;

module.exports.meetings = meetings;

module.exports.rooms = rooms;
