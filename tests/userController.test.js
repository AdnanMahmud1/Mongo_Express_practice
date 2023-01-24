import request from "supertest";
import app from "../src/app";

jest.mock("../src/services/userService");

describe("userController test suite", () => {
  test("getAllUsers shuld returen array of users", async () => {
    let response = await request(app).get("/users");
    expect(response.status).toBe(200);
    let users = response.body;
    expect(users.length).toBe(2);
    expect(users[0]._id).toBe('1')
  });
});
