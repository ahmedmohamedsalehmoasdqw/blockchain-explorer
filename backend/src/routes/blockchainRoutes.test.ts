import request from "supertest";
import express from "express";
import router from "./blockchainRoutes";
import bodyParser from "body-parser";

describe("encryptRoute", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.use("/api", router);
  });

  it("should validate the request body returns 200 on successful validation", async () => {
    const data = {
      sender: "Ahmed",
      receiver: "Saleh",
      amount: "1500",
    };

    const response = await request(app).post("/api/encrypt").send({
      data,
    });

    expect(response.status).toBe(200);
  });

  it("should return a 400 status on validation failure", async () => {
    const response = await request(app)
      .post("/api/encrypt")
      .send({ invalidField: "invalidData" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
