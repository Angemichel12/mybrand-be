import request from "supertest";
import { mongoConnectTest, mongoDisconnectTest } from "../services/mongos";
import app from "../app";
// import { blogData } from "../mock/statics";
import { response } from "express";
import {
  commentData,
  queryData,
  userData,
  userLoginData,
} from "../mock/statics";
import { User } from "../models/user";
import Blog from "../models/Blog";
import Comment from "../models/comments";
import likes from "../models/likes";
import fs from "fs";
import path from "path";
jest.setTimeout(100000);

const blogData = {
  title: "Test Blog Title",
  content: "This is a test blog description.",
  image: "test.png",
};
let token: string;
let blogId: string;
describe("Blog API", () => {
  beforeAll(async () => {
    await mongoConnectTest();
    const { body } = await request(app).post("/api/users/login").send(userData);
    token = body.token;
  }, 100000);
  afterAll(async () => {
    await User.deleteMany();
    await Blog.deleteMany();
    await Comment.deleteMany();
    await likes.deleteMany();
    await mongoDisconnectTest();
  }, 100000);
  describe("Welcome api message", () => {
    test("It should return 200 and welcome message", async () => {
      const { body } = await request(app)
        .get("/api/v1")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(body.message).toStrictEqual("Welcome to the blog API");
    });
    test("It should return 201 and succes message", async () => {
      const { body } = await request(app).get("/api/v1/blogs/").expect(200);
      expect(body.message).toStrictEqual("success");
      expect(body.data).toBeDefined();
    });
    test("It should return signup and login", async () => {
      const response = await request(app)
        .post("/api/v1/users/")
        .send(userData)
        .expect(201);
      const responseLogin = await request(app)
        .post("/api/v1/users/login")
        .send(userLoginData)
        .expect(200);

      // console.log("++++++++++", responseLogin.body);
      token = responseLogin.body.token;
    });

    //=================== Create Blog =================

    test("should create a new blog and return 201", async () => {
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
        .expect(201);

      blogId = createBlogResponse.body.data._id;

      expect(createBlogResponse.body).toHaveProperty(
        "message",
        "blog created successfully"
      );
      expect(createBlogResponse.body.data).toHaveProperty(
        "title",
        blogData.title
      );
      expect(createBlogResponse.body.data).toHaveProperty(
        "content",
        blogData.content
      );

      blogId = createBlogResponse.body.data._id;
    }, 1000000);
    // ================== Display single blog ======
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
