import { WagmiConfig, createClient, configureChains, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);

export const client = createClient({
  connectors: [new InjectedConnector({ chains })],
  autoConnect: true,
  provider,
  webSocketProvider,
});
