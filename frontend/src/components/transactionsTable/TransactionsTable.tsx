import { useBlockchain } from "../../hooks/contexts/useBlockchain/useBlockchain";
import { Block } from "../../types/block";

const TransactionsTable = () => {
  const { blockchain } = useBlockchain();
  return (
    <div className="w-2/3 p-4 mt-8 mb-8">
      {blockchain?.length! > 0 && (
        <table>
          <thead>
            <tr className="text-white">
              <th>Snder</th>
              <th>Receiver</th>
              <th>Block Hash</th>
              <th>Transaction Hash</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {blockchain
              ?.flatMap((block: Block) =>
                block.transactions.map((transaction) => ({
                  transaction,
                  blockInfo: {
                    timestamp: block.timestamp,
                    hash: block.hash,
                  },
                }))
              )
              .map((bi) => (
                <tr key={bi.transaction.hash}>
                  <td className="break-words max-w-[150px] px-4 py-3 text-gray-900 bg-gray-200 first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                    {bi.transaction.sender}
                  </td>
                  <td className="break-words max-w-[150px]px-4 py-3 text-gray-900 bg-gray-200 first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                    {bi.transaction.receiver}
                  </td>
                  <td className="break-words max-w-[300px] px-4 py-3 text-gray-900 bg-gray-200 first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                    {bi.blockInfo.hash}
                  </td>
                  <td className="break-words max-w-[300px] px-4 py-3 text-gray-900 bg-gray-200 first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                    {bi.transaction.hash}
                  </td>
                  <td className="break-words max-w-[300px] px-4 py-3 text-gray-900 bg-gray-200 first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                    {bi.transaction.amount}
                  </td>
                  <td className="break-words max-w-[300px] px-4 py-3 text-gray-900 bg-gray-200 first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg">
                    {bi.blockInfo.timestamp}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
