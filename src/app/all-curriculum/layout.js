<<<<<<< HEAD
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
 

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
 
      <div className={inter.className}>
         
          {children}
        
        </div>
 
  );
=======
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
 

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
 
      <div className={inter.className}>
         
          {children}
        
        </div>
 
  );
>>>>>>> 4a43a5ed28d01ab37a9a81fda44609dfe33daa56
}