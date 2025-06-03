import { Outlet, useLocation } from "react-router-dom";

import "./styles/App.css";
import { useEffect, useState } from "react";
import Loading from "./components/ui/Loading";
import Provider from "./provider/Provider";
import HelmetCustom from "./components/ui/HelmetCustom";
import { PATH_TITLES } from "./utils/constant";
import envConfig from "./config/env.config";
function App() {
  
  const [isLoading, setIsLoading] = useState(true);
  const {pathname} = useLocation()
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <>
    <HelmetCustom subtitle={(PATH_TITLES as any )[pathname]}/>
    <Provider>
      <Outlet />
    </Provider>
    </>
  );
}

export default App;
