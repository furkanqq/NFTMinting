import React, { useState, useEffect } from "react";
import Web3 from "web3";
import MyNFTContract from "./abi.json"; // Akıllı Sözleşme ABI'si

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  function connect() {
    async function initialize() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        const accounts = await web3.eth.requestAccounts();
        setAccounts(accounts);

        const contractAddress = "0x8D068252946cEB60B3829f14122b8B6ae856227b";

        const instance = new web3.eth.Contract(MyNFTContract, contractAddress);
        setContract(instance);
      }
    }

    initialize();
  }

  async function mint() {
    if (contract && accounts.length > 0) {
      // const tokenId = 1; // Mint edilecek NFT'nin benzersiz kimliği
      const hash = await contract.methods.mint().send({ from: accounts[0] });
      console.log(hash, "hash");
    }
  }

  return (
    <div>
      <button onClick={connect}>
        {accounts[0] ? accounts[0] : "Connect Button"}
      </button>
      <button onClick={mint}>Mint</button>
    </div>
  );
}

export default App;
