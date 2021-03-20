const request = require("supertest");
const app = require("./app");

const origin = "http://localhost:3000"

describe("App", () => {
  it('should implement CORS', async() => {
    const { headers } = await request(app).get('/');
    expect(headers['access-control-allow-origin']).toEqual(origin);
  });
});