import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import "./styles/App.css";
import { useEffect, useState } from "react";
import Loading from "./components/ui/Loading";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
