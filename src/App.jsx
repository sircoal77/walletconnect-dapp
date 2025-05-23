// src/App.jsx
import React, { useState } from "react";
import {
  WagmiConfig,
  createClient,
  configureChains,
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const chains = [mainnet, sepolia];
const { provider, webSocketProvider } = configureChains(chains, [publicProvider()]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "b49de02b26fcb4c1ad6f4fb0dbd9caff", // your real WalletConnect Project ID
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function WalletComponent() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <>
          <p>Connected: {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      ) : (
        <>
          <button onClick={() => connect({ connector: new InjectedConnector({ chains }) })}>
            Connect MetaMask
          </button>
          <button
            onClick={() =>
              connect({
                connector: new WalletConnectConnector({
                  chains,
                  options: { projectId: "b49de02b26fcb4c1ad6f4fb0dbd9caff" },
                }),
              })
            }
          >
            Connect WalletConnect
          </button>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <WagmiConfig client={wagmiClient}>
      <div style={{ padding: 20 }}>
        <h1>✅ WalletConnect DApp - wagmi v1</h1>
        <WalletComponent />
        <hr />
        <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      </div>
    </WagmiConfig>
  );
}
