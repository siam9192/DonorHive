import { Outlet } from "react-router-dom";

import "./styles/App.css";
import { useEffect, useState } from "react";
import Loading from "./components/ui/Loading";
import Provider from "./provider/Provider";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [isLoading]);

  // if (isLoading) return <Loading />;

  return (
    <Provider>
      <Outlet />
    </Provider>
  );
}

export default App;
