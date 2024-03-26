import request from "supertest";
import mongoose from "mongoose";
import {
  loginUserData,
  userData,
  queryData,
  commentData,
} from "../mock/statics";
import { User } from "../models/user";
import fs from "fs";
import path from "path";
import Blog from "../models/Blog";
import { server } from "../app";

jest.setTimeout(100000);

let testServer: any;

let token: string;
let blogId: string;
const blogData = {
  title: "Test Blog Title",
  content: "This is a test blog description.",
  image: "test.png",
};

describe("Blog API", () => {
  beforeEach(() => {
    testServer = server;
  });

  afterEach(async () => {
    await testServer.close();
  });

  afterAll(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("user test", () => {
    it("should return 400 and name required", async () => {
      const res = await request(testServer)
        .post("/api/v1/users/signup/")
        .send({ email: "admin1234@gmail.com", password: "Michel@12" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", '"name" is required');
    });

    it("should return 400 and email required", async () => {
      const { body } = await request(testServer)
        .post("/api/v1/users/signup/")
        .send({ name: "admin", password: "Michel@12" })
        .expect(400);

      expect(body.message).toStrictEqual('"email" is required');
    });
    it("return 201 and User created Successfully", async () => {
      const { body } = await request(testServer)
        .post("/api/v1/users/signup/")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(201);

      const loginResponse = await request(testServer)
        .post("/api/v1/users/login/")
        .send(loginUserData)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(loginResponse.body.message).toStrictEqual("login success");
      token = loginResponse.body.token;
    });
    it("return 409 and Email all ready in use", async () => {
      const res = await request(testServer)
        .post("/api/v1/users/signup/")
        .send(userData);

      expect(res.status).toBe(409);
      expect(res.body).toHaveProperty("message", "Email all ready in use");
    });
  });
  describe("Blog test", () => {
    it("should return 200 and Welcome to the blog API", async () => {
      const { body } = await request(testServer)
        .get("/api/v1")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body.message).toStrictEqual("Welcome to the blog API");
    });
    it("should return 200 and list of blog", async () => {
      const { body } = await request(testServer)
        .get("/api/v1/blogs/")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    it("should return 201 and blog successfull created", async () => {
      const createBlogResponse = await request(testServer)
        .post("/api/v1/blogs/")
        .set("Authorization", `Bearer ${token}`)
        .field("title", blogData.title)
        .field("content", blogData.content)
        .attach(
          "image",
          fs.readFileSync(path.join(__dirname, blogData.image)),
          blogData.image
        )
        .expect("Content-Type", /json/)
        .expect(201);

      expect(createBlogResponse.body.message).toStrictEqual(
        "blog created successfully"
      );
      blogId = createBlogResponse.body.data._id;
    });
    it("should display a single blog and return 200", async () => {
      const { body } = await request(testServer)
        .get(`/api/v1/blogs/${blogId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
    //================= create comment =============
    it("should create comment on blog and return 201", async () => {
      const { body } = await request(testServer)
        .post(`/api/v1/blogs/${blogId}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send(commentData)
        .expect(201);
    });
    // =============== get comment ====================
    it("should display comments on blog and return 200", async () => {
      const { body } = await request(testServer)
        .get(`/api/v1/blogs/${blogId}/comments`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
    // =================== create like ===========
    it("should create like on blog and return 201", async () => {
      const { body } = await request(testServer)
        .post(`/api/v1/blogs/${blogId}/likes/`)
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(201);
    });
    // =================== display like ===========
    it("should display like on blog and return 200", async () => {
      const { body } = await request(testServer)
        .get(`/api/v1/blogs/${blogId}/likes/`)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    // =================== remove like ===========
    it("should remove like on blog and return 200", async () => {
      const { body } = await request(testServer)
        .post(`/api/v1/blogs/${blogId}/likes/`)
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
    // ======================= update blog =========
    it("should update blog and return 200", async () => {
      const { body } = await request(testServer)
        .post(`/api/v1/blogs/${blogId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(blogData)
        .expect("Content-Type", /json/)
        .expect(200);
    });
    // =================== Delete Blog ==============
    it("should update blog and return 200", async () => {
      const { body } = await request(testServer)
        .delete(`/api/v1/blogs/${blogId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
    });
    // =================== create queries ==============
    it("should create queries and return 201", async () => {
      const { body } = await request(testServer)
        .post(`/api/v1/queries/`)
        .set("Authorization", `Bearer ${token}`)
        .send(queryData)
        .expect("Content-Type", /json/)
        .expect(201);
    });
    // =================== list of queries ==============
    it("should display list of queries and return 200", async () => {
      const { body } = await request(testServer)
        .get(`/api/v1/queries/`)
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
