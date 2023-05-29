import "../styles/globals.scss";
import "../styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "../components/layout";

export default function App({ Component, pageProps }) {
  // Create a react-query client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
