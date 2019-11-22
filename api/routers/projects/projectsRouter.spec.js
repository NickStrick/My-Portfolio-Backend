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

            let response = await request(server).post('/projects').send({ name: 'this is a new name', address: 'platformer', requested_funds: 1999 })

            expect(response.status).toBe(201);
        })

        it('should insert provided project', async () => {
            const { id } = await projectDb.add({ name: 'this is a name', address: '123 road island', requested_funds: 2000 })
            const project = await projectDb.get(id)

            let projects = await projectDb.get();

            expect(projects).toHaveLength(1);
            expect(project.name).toEqual('this is a name');

            await projectDb.add({ name: 'this is a second name', address: '123 road island', requested_funds: 2000 });
            projects = await projectDb.get();

            expect(projects).toHaveLength(2);
        })

        it('should have a unique name', async () => {

            await request(server).post('/projects')
                .send({ name: 'this is a name', address: '123 road island', requested_funds: 2000 })
            let response = await request(server).post('/projects')
                .send({ name: 'this is a name', address: '123 road island', requested_funds: 2000 })

            expect(response.status).toBe(405);
            expect(response.body.msg).toBe('name must be unique');
        })
    })

    describe('Put /projects/:id endpoint', () => {
        it('should return status code 201', async () => {
            let user = await request(server).get('/projects/:id')
            console.log(user)

            await request(server).post('/projects').send({ name: 'this is a new name', address: 'platformer', requested_funds: 1999 })
            let response = await request(server).put('/projects/1').send({ name: 'this is a new name' })
            expect(response.status).toBe(203);
        })

        it('should insert provided project', async () => {
            const { id } = await projectDb.add({ name: 'this is a name', address: '123 road island', requested_funds: 2000 })
            await projectDb.update(id, { name: 'this is an updated name' })

            let project = await projectDb.get(id)

            expect(project.name).toEqual('this is an updated name');

            const two = await projectDb.add({ name: 'this is a second name', address: '123 road island', requested_funds: 2000 });
            await projectDb.update(two.id, { name: 'this is another updated name' })
            project = await projectDb.get(two.id);

            expect(project.name).toEqual('this is another updated name');
        })
    })
});