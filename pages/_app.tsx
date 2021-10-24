import "@styles/globals.scss";
import { CartProvider } from "src/contexts/cart-context.js";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
};

export default App;
