import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Error sending email to:", to, "Error:", error.message);
    throw new Error("Failed to send email!");
  }
};
