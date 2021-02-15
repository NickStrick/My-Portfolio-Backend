const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


module.exports = router;

const db = require('./contactModel.js');

router.route('/')
    .get(get)
    .post(add)
    ;

// Functions
function get(req, res) {
    db.get()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json({ msg: 'cant find contact table', err }));
}

function add(req, res) {
    const { phone, email, message, firstName, lastName } = req.body;
    
    //sendgrid mail send
    const msg = {
      to: 'strickerdev@gmail.com', // Change to your recipient
      from: 'strickerdevdeploy@gmail.com', // Change to your verified sender
      subject: `Portfolio website mail - ${firstName + ' ' + lastName}`,
      text: `${message} - Contacts:${phone && phone} ${email}`,
      html: `<strong>${message} <br>- Contacts:  ${phone && phone} ${email}</strong>`,
    }
    sgMail
      .send(msg)
      .then(() => {
        res.status(200).json('Email Sent');
      })
      .catch((error) => {
        res.status(500).json(error);
      })
}