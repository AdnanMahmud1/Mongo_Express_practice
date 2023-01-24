import request from "supertest";
import app from "../src/app";

jest.mock("../src/services/userService");
// beforeAll(async () => {
//   console.log("before all");
// });

// afterAll(async () => {
//   console.log("after all");
// });

// beforeEach(async () => {
//   console.log("before each");
// });

// afterEach(async () => {
//   console.log("after each");
// });

describe("user controller test suite", () => {
  test("should work", async () => {
    console.log("first test");
  });

  test("get all user should return all users", async () => {
    console.log("get all user test");
    let response = await request(app).get("/users");

    // expect(response.body).not.toBeNull();
    expect(response.status).toBe(200);
    let users = response.body;
    expect(users.length).toBe(2);
  });
});
