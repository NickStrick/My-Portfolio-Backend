require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

const projectRouter = require('./routers/projects/projectsRouter.js');
const contactRouter = require('./routers/contactinfo/contactRouter.js')
const sendEmail = require('./sendgrid/sendgrid.js');

//routes
server.get('/', (req, res) => {
    res.send('Api Working');
})

server.use('/projects', projectRouter);
server.use('/contact', contactRouter);

module.exports = server;