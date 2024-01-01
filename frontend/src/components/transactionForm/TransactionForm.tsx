import { useState } from "react";
import { useBlockchain } from "../../hooks/contexts/useBlockchain/useBlockchain";

const TransactionForm = () => {
  const [sender, setSender] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [errors, setErrors] = useState<{
    sender: string;
    receiver: string;
    amount: string;
  }>({
    sender: "",
    receiver: "",
    amount: "",
  });
  const { sendTransaction, isLoading } = useBlockchain();

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = { sender: "", receiver: "", amount: "" };

    if (!sender) {
      newErrors.sender = "Sender is required";
      valid = false;
    }

    if (!receiver) {
      newErrors.receiver = "Receiver is required";
      valid = false;
    }

    if (!amount) {
      newErrors.amount = "Amount is required";
      valid = false;
    } else if (isNaN(Number(amount))) {
      newErrors.amount = "Amount must be a number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      await sendTransaction({ sender, receiver, amount });
      // Clear input fields after successful submission
      setSender("");
      setReceiver("");
      setAmount(null);
    }
  };
  return (
    <div className="w-1/3 flex flex-col text-white bg-transparent rounded-xl bg-clip-border items-center">
      <form
        className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6 mt-3">
          <label
            htmlFor="sender"
            className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal"
          >
            <span className="text-red-400">* </span>
            Sender
          </label>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              id="sender"
              placeholder="0x132kaedhiou1"
              className="peer h-full w-full rounded-md border !border-t-blue-gray-200 px-3 py-3 font-sans text-sm font-normal text-gray-900 outline transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent "
              value={sender}
              onChange={(e) => {
                setSender(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, sender: "" }));
              }}
            />
            {errors.sender && (
              <span className="text-red-500">{errors.sender}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-7">
          <label
            htmlFor="receiver"
            className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal"
          >
            <span className="text-red-400">* </span>
            Receiver
          </label>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              id="receiver"
              placeholder="0x132kaedhiou1"
              className="peer h-full w-full rounded-md border !border-t-blue-gray-200 px-3 py-3 font-sans text-sm font-normal text-gray-900 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              value={receiver}
              onChange={(e) => {
                setReceiver(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, receiver: "" }));
              }}
            />
            {errors.receiver && (
              <span className="text-red-500">{errors.receiver}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-7">
          <label
            htmlFor="amount"
            className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal"
          >
            <span className="text-red-400">* </span>
            Amount
          </label>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              id="amount"
              type="number"
              placeholder="1780"
              value={amount?.toString() || ""}
              className="peer h-full w-full rounded-md border !border-t-blue-gray-200 px-3 py-3 font-sans text-sm font-normal text-gray-900 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              onChange={(e) => {
                setAmount(+e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, amount: "" }));
              }}
            />
            {errors.amount && (
              <span className="text-red-500">{errors.amount}</span>
            )}
          </div>
        </div>
        <button
          className="mt-10 block select-none rounded-lg bg-gray-500 py-3 px-6 text-center text-sm font-bold hover:bg-gray-400"
          type="submit"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
