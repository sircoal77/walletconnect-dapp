import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Web3Modal } from '@web3modal/react';
import { EthereumClient, w3mProvider } from '@web3modal/ethereum';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const projectId = 'b49de02b26fcb4c1ad6f4fb0dbd9caff';

const chains = [mainnet, polygon, arbitrum];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId }), publicProvider()]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mProvider({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </React.StrictMode>
);
