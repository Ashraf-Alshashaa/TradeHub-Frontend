import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const App: FC = () => {
  return (
    <div className="app-container">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-content">
        <div className="app-pages">
          <Outlet />
        </div>
        <div className="app-footer">
          <Footer
            githubUrl="https://github.com/Ashraf-Alshashaa/TradeHub-Frontend"
            email="your.email@example.com"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
