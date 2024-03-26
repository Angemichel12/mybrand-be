import request from "supertest";
import app from "../app";
import { mongoConnectTest, mongoDisconnectTest } from "../services/mongos";
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
jest.setTimeout(100000);

jest.setTimeout(100000);
let token: string;
let blogId: string;
const blogData = {
  title: "Test Blog Title",
  content: "This is a test blog description.",
  image: "test.png",
};

describe("Blog API", () => {
  beforeAll(async () => {
    await mongoConnectTest();
  });
  afterAll(async () => {
    await Blog.deleteMany();
    await User.deleteMany();
    await mongoDisconnectTest();
  });
  describe("user test", () => {
    test("should return 400 and name required", async () => {
      const { body } = await request(app)
        .post("/api/v1/users/signup/")
        .send({ email: "admin1234@gmail.com", password: "Michel@12" })
        .expect(400);

      expect(body.message).toStrictEqual('"name" is required');
    });
    test("should return 400 and email required", async () => {
      const { body } = await request(app)
        .post("/api/v1/users/signup/")
        .send({ name: "admin", password: "Michel@12" })
        .expect(400);

      expect(body.message).toStrictEqual('"email" is required');
    });
    test("return 201 and User created Successfully", async () => {
      const { body } = await request(app)
        .post("/api/v1/users/signup/")
        .send(userData)
        .expect("Content-Type", /json/)
        .expect(201);

      const loginResponse = await request(app)
        .post("/api/v1/users/login/")
        .send(loginUserData)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(loginResponse.body.message).toStrictEqual("login success");
      token = loginResponse.body.token;
    });
    test("return 409 and Email all ready in use", async () => {
      const { body } = await request(app)
        .post("/api/v1/users/signup/")
        .send(userData)
        .expect(409);

      expect(body.message).toStrictEqual("Email all ready in use");
    });
  });
  describe("Blog test", () => {
    test("should return 200 and Welcome to the blog API", async () => {
      const { body } = await request(app)
        .get("/api/v1")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(body.message).toStrictEqual("Welcome to the blog API");
    });
    test("should return 200 and list of blog", async () => {
      const { body } = await request(app)
        .get("/api/v1/blogs/")
        .expect("Content-Type", /json/)
        .expect(200);
    });
    test("should return 201 and blog successfull created", async () => {
      const createBlogResponse = await request(app)
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
    test("should display a single blog and return 200", async () => {
      const { body } = await request(app)
        .get(`/api/v1/blogs/${blogId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
    //================= create comment =============
    test("should create comment on blog and return 201", async () => {
      const { body } = await request(app)
        .post(`/api/v1/blogs/${blogId}/comments`)
        .set("Authorization", `Bearer ${token}`)
        .send(commentData)
        .expect(201);
    });
    // =============== get comment ====================
    test("should display comments on blog and return 200", async () => {
      const { body } = await request(app)
        .get(`/api/v1/blogs/${blogId}/comments`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
    // =================== create like ===========
    test("should create like on blog and return 201", async () => {
      const { body } = await request(app)
        .post(`/api/v1/blogs/${blogId}/likes/`)
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(201);
    });
    // =================== display like ===========
    test("should display like on blog and return 200", async () => {
      const { body } = await request(app)
        .get(`/api/v1/blogs/${blogId}/likes/`)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    // =================== remove like ===========
    test("should remove like on blog and return 200", async () => {
      const { body } = await request(app)
        .post(`/api/v1/blogs/${blogId}/likes/`)
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
    // ======================= update blog =========
    test("should update blog and return 200", async () => {
      const { body } = await request(app)
        .post(`/api/v1/blogs/${blogId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(blogData)
        .expect("Content-Type", /json/)
        .expect(200);
    });
    // =================== Delete Blog ==============
    test("should update blog and return 200", async () => {
      const { body } = await request(app)
        .delete(`/api/v1/blogs/${blogId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
    });
    // =================== create queries ==============
    test("should create queries and return 201", async () => {
      const { body } = await request(app)
        .post(`/api/v1/queries/`)
        .set("Authorization", `Bearer ${token}`)
        .send(queryData)
        .expect("Content-Type", /json/)
        .expect(201);
    });
    // =================== list of queries ==============
    test("should display list of queries and return 200", async () => {
      const { body } = await request(app)
        .get(`/api/v1/queries/`)
        .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
