// pages/_app.js
'use client'; // Not necessary here in the pages directory
import "@styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../../redux/store"; // Adjust based on folder structure
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className={`${roboto.className} bg-white`}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
