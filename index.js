import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// create app instance
const app = express();
const port = process.env.PORT ? process.env.PORT : 8080;

// configurations
dotenv.config();
app.use(express.json());

// nodemailer transporter instance
const transporter = nodemailer.createTransport({
    service: process.env.PROVIDER,
    auth: {
        user: process.env.NODEUSER,
        pass: process.env.NODEPASS
    }
});


// home route
app.get("/", (req, res) => {
    res.send("Hi there! Nothing is here for you!");
})


// contact route
app.post("/contact", (req, res) => {
    
    // construct email content
    let content = `
    From: ${req.query.name} 
    Email ID: ${req.query.sender}

    Message:
    ${req.query.message}
    `;

    let mailOptions = {
        from: process.env.NODEUSER,
        to: process.env.NODEUSER,
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

app.listen(port, (err) => {
    console.log("App listening on port - " + port);
})