import React from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

const injected = new InjectedConnector({
  supportedChainIds: [11155111], 
});

const WalletConnect = () => {
  const { activate, active, account } = useWeb3React();

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  return (
    <div>
      {active ? (
        <p>Connected with <strong>{account}</strong></p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;

