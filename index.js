import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// create app instance
const app = express();

// configurations
dotenv.config();
app.use(express.json());

// nodemailer transporter instance
const transporter = nodemailer.createTransport({
    service: process.env.PROVIDER,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

app.post("/contact", (req, res) => {
    // construct email content
    let content = `
    From: ${req.query.name} 
    Email ID: ${req.query.sender}

    Message:
    ${req.query.message}
    `;

    let mailOptions = {
        from: process.env.USER,
        to: process.env.USER,
        subject: 'Message from portfolio',
        text: content
    };

    // send mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);

            res.status(500);
            res.errored("Something went wrong!");
        } else {
            console.log(info.response);
            res.send("Message sent successfully!");
        }
    });
})

app.listen(3000, (err) => {
    console.log("App listening on port - " + 3000);
})