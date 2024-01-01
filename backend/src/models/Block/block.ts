import { createHash } from "crypto";
import { Transaction } from "../Transaction/transaction";

// Represents a block in the blockchain, containing transactions.
export class Block {
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  timestamp: number;

  constructor(transactions: Transaction[], previousHash: string) {
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.timestamp = Date.now();
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return createHash("sha256")
      .update(JSON.stringify(this.transactions))
      .digest("hex");
  }
}
