import { Transaction } from "../Transaction/transaction";
import { Block } from "./block";

jest.mock("crypto", () => ({
  createHash: jest.fn(() => ({
    update: jest.fn(() => ({
      digest: jest.fn(() => "aKnownHashForThisInput"),
    })),
  })),
}));

describe("Block", () => {
  it("should calculate the hash based on transactions", () => {
    const transactions = [
      new Transaction("Sender1", "Receiver1", 50),
      new Transaction("Sender2", "Receiver2", 75),
    ];
    const previousHash = "previousHash";

    const block = new Block(transactions, previousHash);
    const calculatedHash = block.calculateHash();
    const expectedHash = "aKnownHashForThisInput";

    expect(calculatedHash).toBe(expectedHash);
  });

  it("should create a block with the correct properties", () => {
    const transactions = [
      new Transaction("Sender1", "Receiver1", 50),
      new Transaction("Sender2", "Receiver2", 75),
    ];
    const previousHash = "previousHash";

    const block = new Block(transactions, previousHash);

    expect(block.transactions).toEqual(transactions);
    expect(block.previousHash).toBe(previousHash);
    expect(typeof block.timestamp).toBe("number");
    expect(typeof block.hash).toBe("string");
  });
});
