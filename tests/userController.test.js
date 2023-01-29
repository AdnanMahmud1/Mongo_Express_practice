import { date } from "joi";
import request from "supertest";
import app from "../src/app";
import { response } from "express";

jest.mock("../src/services/userService");

describe("userController test suite", () => {
  test.only("get shuld returen array of users", async () => {
    let response = await request(app).get("/users");
    expect(response.status).toBe(200);
    let users = response.body;
    expect(users.length).toBe(1);
    expect(users[0].id).toBe("1");
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

  test("get by id should return an user", async () => {
    let response = await request(app).get("/users/1");
    let user = response.body;
    expect(user.id).toBe("1");
  });

  test("put should update an existing user ", async () => {
    let user = { id: "1", username: "testUser 003" };
    let response = await request(app).put("/users").send(user);
    expect(response.statusCode).toBe(200);
    let updatedUserResponse = await request(app).get("/users/1");
    let updatedUser = updatedUserResponse.body;
    expect(updatedUser.username).toBe(user.username);
  });

  test.only("delete by id should return success message", async () => {
    let response = await request(app).delete("/users/1");
    expect(response.statusCode).toBe(200);
    let deletedUserResponse = await request(app).get("/users/1");
    expect(deletedUserResponse.statusCode).toBe(404);
    let body = deletedUserResponse.body;
    expect(body.message).toBe("user not found by the id: 1");
  });
});
  