import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Outlet />;
      <Footer
        githubUrl="https://github.com/Ashraf-Alshashaa/TradeHub-Frontend"
        email="your.email@example.com"
      />
    </Suspense>
  );
};

export default App;
