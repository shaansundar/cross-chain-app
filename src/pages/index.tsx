import { Inter } from "@next/font/google";
import { ethers } from "ethers";
import { useState } from "react";
import {
  useAccount,
  useConnect,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import abi from "./abi.json";
const inter = Inter({ subsets: ["latin"] });

const HyphenLPAddress = "0xE61d38cC9B3eF1d223b177090f3FD02b0B3412e7";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading } = useConnect();
  const [amount, setAmount] = useState(0);

  const { config } = usePrepareContractWrite({
    address: HyphenLPAddress,
    chainId: 5,
    abi,
    functionName: "depositNative",
    args: [address, 80001, "My first Cross chain swap"],
    overrides: {
      value: ethers.utils.parseEther(`${amount}`),
    },
  });
  const {
    data,
    isLoading: transactionLoading,
    isSuccess,
    write,
  } = useContractWrite(config);

  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-col items-center justify-center gap-8 text-black">
      <h1 className="text-6xl font-bold">Cross chain swap!</h1>
      <input
        onChange={(e) => setAmount(Number(e.target.value))}
        type="number"
        className="w-80 h-16 bg-transparent border-2 border-black rounded-xl p-2"
      />
      <div>
        <button
          onClick={() => connect({ connector: connectors[0] })}
          className="mx-4 bg-black text-white disabled:bg-slate-700 p-4 w-40 rounded-xl"
          disabled={isLoading || isConnected}
        >
          {isLoading ? "Loading" : "Connect Wallet"}
        </button>
        <button
          onClick={() => write?.()}
          className="mx-4 bg-black text-white p-4 w-40 rounded-xl"
        >
          Swap
        </button>
      </div>
      {typeof address !== undefined && <p>{address}</p>}
      {error && <p className="text-red-500">{"Error: " + error}</p>}
      {transactionLoading && (
        <p className="text-yellow-900">{"Transaction in progress"}</p>
      )}
      {isSuccess && <p className="text-green-500">{"Success!"}</p>}
    </div>
  );
}
