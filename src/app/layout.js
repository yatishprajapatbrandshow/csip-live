'use client'
import "@styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'], // Specify the subset
  weight: ['400', '500', '700'], // Specify the font weights you need
  display: 'swap', // Optional: Use 'swap' for better font loading behavior
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body
        className={`antialiased overflow-x-hidden`}
      ><Provider store={store}>
        {children}
        </Provider>
      </body>
    </html>
  );
}
