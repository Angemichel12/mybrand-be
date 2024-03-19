import request from "supertest";
import { mongoConnect, mongoDisconnect } from "../services/mongos";
import app from "../app";

describe("Blog API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  describe("Welcome api message", () => {
    test("It should return 200 and welcome message", async () => {
      const { body } = await request(app)
        .get("/api/v1")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(body.message).toStrictEqual("Welcome to the blog API");
    });
  });
});
