import express, { Request, Response, NextFunction } from "express";
import { Blockchain } from "../models/Blockchain/blockchain";
import { createTransactionSchema } from "../validators/createTransactionSchema";
import { Transaction } from "../models/Transaction/transaction";

const router = express.Router();
const blockchain = Blockchain.getInstance();

router.use(
  "/encrypt",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createTransactionSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
    }
  }
);

router.post("/encrypt", async (req, res) => {
  try {
    const data = req.body.data;
    const sender = data.sender;
    const receiver = data.receiver;
    const amount = data.amount;

    blockchain.addBlock(new Transaction(sender, receiver, amount));
    res.status(200).json(blockchain.chain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
