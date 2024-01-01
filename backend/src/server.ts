import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import blockchainRoutes from "./routes/blockchainRoutes";
import cors from "cors";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", blockchainRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT:${port}`);
});
