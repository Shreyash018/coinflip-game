import React, { useState } from 'react';
import { ethers, parseEther } from 'ethers';  
import { useWeb3React } from '@web3-react/core';

const contractAddress = "0xbfedff0a52f25ceca698f97fd41d7a842d675568";
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "guess",
        "type": "bool"
      }
    ],
    "name": "flipCoin",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const CoinFlipGame = () => {
  const { library } = useWeb3React();
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const flipCoin = async (guess) => {
    if (!library || !amount) return;

    setLoading(true);
    const signer = library.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      const tx = await contract.flipCoin(guess, { value: parseEther(amount) }); // Use parseEther directly
      await tx.wait();
      setResult(guess); // Assuming flipCoin returns true for heads and false for tails
    } catch (error) {
      console.error("Error flipping coin:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Flip the Coin!</h2>
      <input 
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount in ETH"
        disabled={loading}
      />
      <button onClick={() => flipCoin(true)} disabled={loading}>Heads</button>
      <button onClick={() => flipCoin(false)} disabled={loading}>Tails</button>
      {loading && <p>Flipping the coin...</p>}
      {result !== null && <p>Result: {result ? "You won!" : "You lost!"}</p>}
    </div>
  );
};

export default CoinFlipGame;



