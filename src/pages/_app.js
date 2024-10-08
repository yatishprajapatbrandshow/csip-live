// pages/_app.js
'use client'; // Not necessary here in the pages directory
import "@styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../../redux/store"; // Adjust based on folder structure
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-white">

    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </div>
  );
}

export default MyApp;
