import nodemailer from "nodemailer";
declare const transport: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export default transport;
