import fs from "fs";

//memory variable
let users = [
  {
    username: "admin1",
    //raw password is "1234"
    password: "$2a$12$6lU7JRPa1lbbxnZlGBGJVOWcLxCxKphY2hyhMFydu8Yiyn.kWLAou",
    isAdmin: true,
    money: null,
  },
  {
    username: "user1",
    //raw password is "1234"
    password: "$2a$12$6lU7JRPa1lbbxnZlGBGJVOWcLxCxKphY2hyhMFydu8Yiyn.kWLAou",
    isAdmin: false,
    money: 1000,
  },
  {
    username: "user2",
    //raw password is "1234"
    password: "$2a$12$6lU7JRPa1lbbxnZlGBGJVOWcLxCxKphY2hyhMFydu8Yiyn.kWLAou",
    isAdmin: false,
    money: 500,
  },
];

export function readUsersDB() {
  //read db from text file if run on local
  if (process.env.NODE_ENV === "development") {
    const str = fs.readFileSync("db/users.json", {
      encoding: "utf-8",
    });
    const users = JSON.parse(str);
    return users;
    //read db from memory if run on vercel
  } else if (process.env.NODE_ENV === "production") {
    return users;
  }
}

export function writeUsersDB(_users) {
  //read db from text file if run on local
  if (process.env.NODE_ENV === "development") {
    const str = JSON.stringify(_users);
    fs.writeFileSync("db/users.json", str, { encoding: "utf-8" });
    //read db from memory if run on vercel
  } else if (process.env.NODE_ENV === "production") {
    users = _users;
  }
}
