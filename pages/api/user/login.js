import { readUsersDB } from "../../../backendLibs/dbLib";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default function loginRoute(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    //validate body
    if (
      typeof username !== "string" ||
      username.length === 0 ||
      typeof password !== "string" ||
      password.length === 0
    )
      return res
        .status(400)
        .json({ ok: false, message: "Username or password cannot be empty" });

    const users = readUsersDB();
    //find user with username & password
    const userResult = users.find(user => {
      return user.username === username && bcrypt.compareSync(password, user.password);
    })

    if (userResult == null)
      return res.status(400).json({ ok: false, message: "Invalid Username or Password" });

    const secret = process.env.JWT_SECRET;
    //create token and return response
    const token = jwt.sign({
      username: userResult.username,
      isAdmin: userResult.isAdmin,
    }, secret)
    return res.status(200).json({
      ok: true,
      username: userResult.username,
      isAdmin: userResult.isAdmin,
      token: token,
    })
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
