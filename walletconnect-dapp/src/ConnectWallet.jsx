import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Web3Button } from "@web3modal/react";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <>
          <p>Connected: {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      ) : (
        <Web3Button />
      )}
    </div>
  );
}
