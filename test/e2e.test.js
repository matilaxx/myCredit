const request = require("supertest");
const app = require("../app");

const truncate = require("../helper/truncate");





// register
describe("Test register user", () => {
    const registerUrl = "/api/v1/auth/register";
    const data = {
      nama: "Alvan",
      email: "alvaniutama09@gmail.com",
      password: "alvan123",
    };

  
    it("should return status code 201 when user created ", async () => {
      await truncate.user();
      const res = await request(app).post(registerUrl).send(data);
  
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("message", "Successfully create user");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("nama");
      expect(res.body.data).toHaveProperty("email");
    });
    it("should return a 422 if email already exist", async () => {
        const res = await request(app).post(registerUrl).send(data);
        expect(res.status).toBe(422);
        expect(res.body.message).toBe("Email already exists");
      });
  });
  


  //login

  describe("Test login user", () => {
    const loginUrl = "/api/v1/auth/login";
    const data = {
      email: "alvaniutama09@gmail.com",
      password: "alvan123",
    };
  
    it("should return a 401 error if input not valid", async () => {
      const res = await request(app)
        .post(loginUrl)
        .send({ email: "alvaniutama09@gmail.com", password: "alvan1234" });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid email or password");
    });
  
    it("should return status code 200 when user login ", async () => {
      const res = await request(app).post(loginUrl).send(data);
  
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Success login");
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("token");
    });
  });
  

  //test get detail user (token)
  describe("Test get detail user", () => {
    const userUrl = "/api/v1/user/21";
    const userrUrl = "/api/v1/user/1";
  
    it("should return a 404 if user not found", async () => {
        const res = await request(app).post("/api/v1/auth/login").send({
            email: "alvaniutama09@gmail.com",
            password: "alvan123",
          });
          const token = res.body.token;
          const res2 = await request(app)
            .get(userUrl)
            .set("Authorization", `${token}`);
        expect(res2.status).toBe(404);
        expect(res2.body.message).toBe("User Not Found !");
      });
      
    it("should return a 200 if login", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "alvaniutama09@gmail.com",
        password: "alvan123",
      });
      const token = res.body.token;
      const ress = await request(app)
        .get(userrUrl)
        .set("Authorization", `${token}`);
      expect(ress.status).toBe(200);
      expect(ress.body).toHaveProperty("message", "Successfully get user by id");
      expect(ress.body).toHaveProperty("user");
      expect(ress.body.user).toHaveProperty("id");
      expect(ress.body.user).toHaveProperty("nama");
      expect(ress.body.user).toHaveProperty("email");
    });
  });