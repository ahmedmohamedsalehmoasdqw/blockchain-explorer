import { Transaction } from "../Transaction/transaction";
import { Blockchain } from "./blockchain";

describe("Blockchain", () => {
  let blockchain: Blockchain;

  beforeEach(() => {
    blockchain = Blockchain.getInstance();
  });

  test("it should create the genesis block", () => {
    expect(blockchain.chain.length).toBe(1);
    expect(blockchain.getLatestBlock().previousHash).toBe("0");
  });

  test("it should add a new block to the blockchain", () => {
    const transaction = new Transaction("Sender1", "Recipient1", 10);

    blockchain.addBlock(transaction);

    expect(blockchain.chain.length).toBe(2);
    const latestBlock = blockchain.getLatestBlock();
    expect(latestBlock.transactions).toEqual([transaction]);
    expect(latestBlock.hash).toBeTruthy();
  });

  test("it should enforce the singleton pattern", () => {
    const newBlockchainInstance = Blockchain.getInstance();

    expect(newBlockchainInstance).toBe(blockchain);
  });
});
