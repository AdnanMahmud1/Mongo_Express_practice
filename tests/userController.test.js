import { date } from "joi";
import request from "supertest";
import app from "../src/app";

jest.mock("../src/services/userService");

describe("userController test suite", () => {
  test("get shuld returen array of users", async () => {
    let response = await request(app).get("/users");
    expect(response.status).toBe(200);
    let users = response.body;
    expect(users.length).toBe(1);
    expect(users[0]._id).toBe("01");
  });

  test("post should returen saved id", async () => {
    let user = { username: "test002" };
    let response = await request(app).post("/users").send(user);
    expect(response.statusCode).toBe(201);
    let id = response.body;
    expect(id.length).toBe(24);
    let savedUserResponse = await request(app).get("/users/" + id);
    let savedUser = savedUserResponse.body;
    expect(savedUser.createdAt).not.toBe(null);
    expect(savedUser.username).toBe(user.username);
  });
});
