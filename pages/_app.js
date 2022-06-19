import "../styles/global.css";
import MyContextProvider from "../src/context/store/Context";

function MyApp({ Component, pageProps }) {
  return (
    <MyContextProvider>
      <Component {...pageProps} />
    </MyContextProvider>
  );
}

export default MyApp;
