/*** this code tests the auth middleware */

const {User} = require('../../models/user');
const {Genre} = require('../../models/genre');
const request = require('supertest');

describe('auth middleware', () => {
  // before each test create a server
  beforeEach(() => { server = require('../../index'); })
  // at the end of each test clear out Genre and close the server
  afterEach(async () => { 
    await Genre.remove({});
    await server.close(); 
  });

  let token; 

  // this executes a post to genres with the correct header and token and sets name to genre 1
  const exec = () => {
    return request(server)
      .post('/api/genres')
      .set('x-auth-token', token)
      .send({ name: 'genre1' });
  }

  // generate a new token each time a test is run
  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('should return 401 if no token is provided', async () => {
    token = ''; 

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if token is invalid', async () => {
    token = 'a'; 

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});