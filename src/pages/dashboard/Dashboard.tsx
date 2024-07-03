import { Button, ButtonGroup } from "react-bootstrap";
import BidsReports from "./BidsReports";
import SalesReport from "./SalesReports";
import { useEffect, useState } from "react";
import DropdownMenu from "../../components/dropdown/Dropdown";
import CustomButton from "../../components/button/Button";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    user.role !== "admin" && navigate("/login");
  }, []);

  const [activeTab, setactiveTab] = useState<number>(1);
  const [timePeriod, setTimePeriod] = useState<string>("lastMonth");
  const dispatch = useDispatch<AppDispatch>();

  const tabs = [
    { id: 1, text: "Sales" },
    { id: 2, text: "Bids" },
  ];

  const handleLogoutSelect = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="period-selector">
          <DropdownMenu
            title={timePeriod == "lastMonth" ? "Last Month" : timePeriod}
            data={[
              {
                id: "1",
                content: "Last Year",
                onClick: () => setTimePeriod("lastYear"),
              },
              {
                id: "2",
                content: "Last Month",
                onClick: () => setTimePeriod("lastMonth"),
              },
            ]}
            selector={true}
          />
        </div>
        <div className="dashboard-tabs-container">
          <ButtonGroup className="px-1 py-2 bg-light rounded-1 asd">
            {tabs.map((tab) => (
              <Button
                key={"dashboard-" + tab.id}
                variant={activeTab === tab.id ? "secondary" : "light"}
                onClick={() => setactiveTab(tab.id)}
              >
                {tab.text}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <div className="dashboard-logout">
          <CustomButton
            buttonType="secondary"
            onClick={handleLogoutSelect}
            text="logout"
          />
        </div>
      </div>
      {activeTab == 1 && <SalesReport timePeriod={timePeriod} />}
      {activeTab == 2 && <BidsReports timePeriod={timePeriod} />}
    </div>
  );
};

export default Dashboard;
