import React, { useState } from "react";
import axios from 'axios';

const GenerateWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerateWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];
        setWalletAddress(address);

        // Save wallet address to backend
        const userEmail = "user@example.com"; // Replace with actual user email
        const response = await axios.post("/save-wallet", { userEmail, walletAddress: address });
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error:", error);
        setMessage("Failed to save wallet address.");
      }
    } else {
      setMessage("MetaMask is not installed. Please install it to proceed.");
    }
  };

  return (
    <div>
      <h2>Generate Wallet Address</h2>
      <button onClick={handleGenerateWallet}>Generate Wallet</button>
      {walletAddress && <p>Wallet Address: {walletAddress}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default GenerateWallet;
