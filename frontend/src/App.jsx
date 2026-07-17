import { useAuth } from "@clerk/react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader";
import HomePage from "./pages/Homepage";

function App() {
  const { isLoaded } = useAuth();
  if (!isLoaded) return <PageLoader />;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
