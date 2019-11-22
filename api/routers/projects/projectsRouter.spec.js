const request = require('superTest');
const db = require('../../../data/dbConfig.js');
const projectDb = require('./projectsModel.js');
const server = require('../../server.js');

afterEach(async () => {
    await db('projects').truncate()
});

describe('server.js', () => {
    describe('GET /projects endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/projects');

            expect(response.status).toBe(200);
        })
        it('should respond with JSON', async () => {
            let response = await request(server).get('/projects');

            expect(response.type).toMatch(/json/i);
        })
        it('should respond with array', async () => {
            const expected = [];
            let response = await request(server).get('/projects');

            expect(response.body).toMatchObject(expected);
        })
    })


    describe('Post /projects endpoint', () => {
        it('should return status code 201', async () => {

        })

        it('should insert provided project', async () => {

        })

        it('should have a unique name', async () => {

        })
    })
});