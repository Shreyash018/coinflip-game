
import React from 'react';
import WalletConnect from './components/WalletConnect';
import CoinFlipGame from './components/CoinFlipGame';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Coin Flip DApp</h1>
        <WalletConnect/>
        <CoinFlipGame />
      </header>
    </div>
  );
}

export default App;
