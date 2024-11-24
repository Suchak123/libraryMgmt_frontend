import React, { useState } from "react";
import API from "../../services/api";

const SaveWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerateWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0]; 
        setWalletAddress(address);
        setMessage("Wallet address fetched successfully!");
      } catch (error) {
        console.error("Error fetching wallet address:", error);
        setMessage("Failed to fetch wallet address. Please try again.");
      }
    } else {
      setMessage("MetaMask is not installed. Please install it to proceed.");
    }
  };

  const handleSaveWallet = async () => {
    if (!walletAddress) {
      setMessage("Please generate a wallet address first.");
      return;
    }

    try {
      const userEmail = "user@example.com"; // 
      const response = await API.post("/save-wallet", { userEmail, walletAddress });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error saving wallet address:", error);
      setMessage("Failed to save wallet address. Please try again.");
    }
  };

  return (
    <div>
      <h2>Save Wallet Address</h2>
      <button onClick={handleGenerateWallet}>Generate Wallet Address</button>

      {walletAddress && <p>Wallet Address: {walletAddress}</p>}

      <button onClick={handleSaveWallet} disabled={!walletAddress}>
        Save Wallet Address
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SaveWallet;
