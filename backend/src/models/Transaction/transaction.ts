import { createHash } from "crypto";

// Represents a single transaction in the blockchain.
export class Transaction {
  sender: string;
  receiver: string;
  amount: number;
  hash: string;

  constructor(sender: string, receiver: string, amount: number) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return createHash("sha256")
      .update(JSON.stringify({ obj: this, timestamp: new Date().getTime() }))
      .digest("hex");
  }
}
