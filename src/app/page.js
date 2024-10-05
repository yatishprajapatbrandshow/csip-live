'use client'
import { Provider } from "react-redux";
import { store } from "../redux/store";
import HomePage from "./HomePage";
export default function Home() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}
