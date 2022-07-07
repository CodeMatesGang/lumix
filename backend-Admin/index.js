import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import FileUpload from "express-fileupload";
import db from "./config/Database.js";
import router from "./routes/index.js";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(router);

app.post("/api/sendreplies", async (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const reply = req.body.reply;
  console.log(email, subject, reply);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "warren.shanahan63@ethereal.email", // generated ethereal user
      pass: "jKUTMN5xwfjJUJsA9w", // generated ethereal password
    },
  });

  const msg = {
    from: '"Lions Club of Colombo Centennial" <jarrod.ledner75@ethereal.email>', // sender address
    to: `${email}`, // list of receivers
    subject: `${subject}`, // Subject line
    text: `${reply}`, // plain text body
  };

  // send mail with defined transport object
  const info = await transporter.sendMail(msg).then((info) => {
    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
  });
});

app.listen(5000, () => console.log("Server running at port 5000"));
