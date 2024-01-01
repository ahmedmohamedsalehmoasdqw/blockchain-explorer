import { ReactNode, createContext, useContext, useState } from "react";
import { Blockchain } from "../../../types/blockchain";
import useHttp from "../../http/useHttp";
import { toast } from "react-toastify";

interface TransactionDTO {
  sender: string | null;
  receiver: string | null;
  amount: number | null;
}
interface BlockchainContextProps {
  blockchain: Blockchain | undefined;
  sendTransaction: (transaction: TransactionDTO) => Promise<void>;
  isLoading: boolean;
}

const BlockchainContext = createContext<BlockchainContextProps | undefined>(
  undefined
);

export const useBlockchain = (): BlockchainContextProps => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error("useBlockchain must be used within a BlockchainProvider");
  }
  return context;
};

interface BlockchainProviderProps {
  children: ReactNode;
}

export const BlockchainProvider: React.FC<BlockchainProviderProps> = ({
  children,
}) => {
  const { post } = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const [blockchain, setBlockchain] = useState<Blockchain | undefined>(
    undefined
  );

  const sendTransaction = async (
    transaction: TransactionDTO
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await post<Blockchain>("/encrypt", {
        data: transaction,
      });
      if (response != null) {
        setBlockchain(response);
        toast.success("Transaction sent successfully");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending transaction:", error);
    }
  };

  const contextValue: BlockchainContextProps = {
    blockchain,
    sendTransaction,
    isLoading,
  };

  return (
    <BlockchainContext.Provider value={contextValue}>
      {children}
    </BlockchainContext.Provider>
  );
};
