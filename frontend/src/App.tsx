import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Navbar from "./components/nabvbar/Navbar";
import TransactionForm from "./components/transactionForm/TransactionForm";
import TransactionsTable from "./components/transactionsTable/TransactionsTable";
import { BlockchainProvider } from "./hooks/contexts/useBlockchain/useBlockchain";

function App() {
  return (
    <div className="bg-gray-900 w-screen h-screen">
      <Navbar />
      <div className="flex">
        <BlockchainProvider>
          <TransactionForm />
          <TransactionsTable />
        </BlockchainProvider>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
