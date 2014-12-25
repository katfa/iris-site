var mailer = require('nodemailer');

module.exports = {
    method: 'POST',
    path: '/send',
    handler: function (req, rep) {
        var smtpTransport =  mailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                user: "norwegiantranslatortest@gmail.com",
                pass: "testpassw0rd"
            }
        });

        var mailOptions = {
            to: "katfaquino@gmail.com",
            subject: "TEST",
            text: "SENDER: " + req.payload.email + "\n\nMESSAGE: " + req.payload.message

        };

        smtpTransport.sendMail(mailOptions, function (err, resp) {
            if (err) {
                console.log(err);
                rep("error");
            } else {
                console.log("Message sent: " + resp.message);
                rep("sent");
            }
        });
    }
};