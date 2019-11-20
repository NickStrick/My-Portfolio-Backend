const request = require('superTest');
const db = require('../../../data/dbConfig.js');
const schoolDb = require('./projectsModel.js');
const server = require('../../server.js');

afterEach(async () => {
    await db('projects').truncate()
});

