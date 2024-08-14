import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Presale from "./routes/Presale";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { adminPublickey } from "./utils/constants";
import { useEffect, useState } from "react";

function App() {
  const [adminState, setadminState] = useState(false);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  useEffect(() => {
    if (connection && publicKey) {
      let admin = publicKey.equals(adminPublickey);
      if (admin) {
        setadminState(true);
      } else {
        setadminState(false);
      }
    }
  }, [publicKey, connection]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    
    {
      path: "/presale",
      element: <Presale adminState={adminState} />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
