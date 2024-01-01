import { Block } from "../Block/block";
import { Transaction } from "../Transaction/transaction";

// Represents the entire blockchain and manages block operations.
export class Blockchain {
  private static instance: Blockchain;
  chain: Block[];

  // Private constructor to enforce singleton pattern and create the genesis block.
  private constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  static getInstance(): Blockchain {
    if (!Blockchain.instance) {
      Blockchain.instance = new Blockchain();
    }
    return Blockchain.instance;
  }

  // Creates the initial block (genesis block) for the blockchain.
  createGenesisBlock(): Block {
    return new Block([new Transaction("Genesis", "Recipient", 0)], "0");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  // Adds a new block to the blockchain based on provided transactions.
  addBlock(transaction: Transaction): void {
    const newBlock: Block = new Block(
      [transaction],
      this.getLatestBlock().hash
    );

    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}
