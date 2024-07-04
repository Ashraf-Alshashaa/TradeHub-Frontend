import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchSalesPerformanceReport } from "../../features/reports/reportsSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import { ReportsComponentProps } from "./types";
import "chart.js/auto";
import "./styles.css";
import ErrorComponent from "../../components/error/Error";

const SalesReport: React.FC<ReportsComponentProps> = ({ timePeriod }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { salesPerformance, loading, error } = useSelector(
    (state: RootState) => state.reports
  );

  useEffect(() => {
    dispatch(fetchSalesPerformanceReport(timePeriod));
    console.log(salesPerformance);
  }, [dispatch, timePeriod]);

  const getSalesLabels = () =>
    salesPerformance?.sales_data.map((data) => data.label) || [];
  const getSalesAmounts = () =>
    salesPerformance?.sales_data.map((data) => data.amount) || [];

  const salesData = {
    labels: getSalesLabels(),
    datasets: [
      {
        label: "",
        data: getSalesAmounts(),
        backgroundColor: "#00008B",
        fill: false,
      },
    ],
  };

  const productBarData = {
    labels: ["Published", "Sold"],
    datasets: [
      {
        label: "",
        data: [
          salesPerformance?.published_products || 0,
          salesPerformance?.sold_products || 0,
        ],
        backgroundColor: ["#FF8C00", "#00BFFF"],
      },
    ],
  };

  const allProductBarData = {
    labels: ["Published", "Sold"],
    datasets: [
      {
        label: "All Products",
        data: [
          salesPerformance?.all_published_products,
          salesPerformance?.all_sold_products,
        ],
        backgroundColor: ["#90EE90", "#00BFFF"],
      },
    ],
  };

  const chartLabelHideOption = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorComponent msg={error.detail} />;

  return (
    <div>
      <h2 className="dashboard-page-title">Sales Performance</h2>
      <div className="performance-container">
        <div className="performance-left-section">
          <span className="performance-left-section-title">
            {timePeriod == "lastMonth" ? "Last Month" : "Last Year"} Sales
            Amount
          </span>
          <Bar data={salesData} options={chartLabelHideOption} />
        </div>
        <div className="performance-right-section">
          <div className="performance-right-section-top">
            <span>
              Products Of{" "}
              {timePeriod == "lastMonth" ? "Last Month" : "Last Year"}
            </span>
            <Doughnut data={productBarData} />
          </div>
          <div className="performance-right-section-bottom">
            <span>Products Of All Times</span>
            <Bar data={allProductBarData} options={chartLabelHideOption} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
