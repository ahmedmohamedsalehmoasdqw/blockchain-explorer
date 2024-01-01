import { Transaction } from "./transaction";

export type Block = {
  transactions: Transaction[];
  timestamp: string;
  hash: string;
};
