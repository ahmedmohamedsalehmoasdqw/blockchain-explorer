import { Transaction } from "./transaction";

describe("Transaction", () => {
  it("should create a transaction with the correct properties", () => {
    const sender = "Sender";
    const receiver = "Receiver";
    const amount = 100;

    const transaction = new Transaction(sender, receiver, amount);

    expect(transaction.sender).toBe(sender);
    expect(transaction.receiver).toBe(receiver);
    expect(transaction.amount).toBe(amount);
  });
});
