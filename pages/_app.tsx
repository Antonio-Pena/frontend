import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import client from "../src/apollo/apolloClient";
import Menu from "../src/components/Menu";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Menu />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
