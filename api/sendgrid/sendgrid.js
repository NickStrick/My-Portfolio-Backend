
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
