
require('dotenv').config();
const db = require('../../data/dbConfig');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// model functions

const fromEmailDB = (id) => {
    return db('users')
        .select('users.email as fromEmail')
        .where('users.id', id)
}

const fromUsernameDB = (id) => {
    return db('users')
        .select('users.username')
        .where('users.id', id)
}

// Route functions ===========================
const router = require('express').Router();
module.exports = router;

router.post('/', sendEmail);

async function sendEmail(req, res) {
    const { msg } = req.body;
    // let toEmail;
    // let fromEmail;
    // let fromUser;

    // await fromEmailDB(dreamer_id).then(result => toEmail = (result[0].fromEmail)).catch(err => res.send({ msg: "Failed get by dreamer id", err }));
    // await fromEmailDB(user_id).then(result => fromEmail = result[0].fromEmail).catch(err => res.send({ msg: "Failed get by user-donor id ", err }));
    // await fromUsernameDB(user_id).then(result => fromUser = result[0].username).catch(err => res.send({ msg: "Failed to get user username ", err }));

    try {
        const msg = {
            to: 'strickerdev@gmail.com',
            from: 'mymphydreamers@gmail.com',
            subject: 'Someone from your protfolio wants to contact you!',
            text: `${msg} `,
        };

        sgMail.send(msg);
        res.status(200).send("email sent!")
    } catch (err) {
        res.status(400).send({ err, msg: 'failed to send email' })
    }
}
