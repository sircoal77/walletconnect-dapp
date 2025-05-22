import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export default function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();

  return (
    <div style={{ padding: 20 }}>
      <h1>WalletConnect v2 Dapp</h1>
      {isConnected ? (
        <>
          <p>Connected as: {address}</p>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
