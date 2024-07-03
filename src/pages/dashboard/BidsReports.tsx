import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchBidsPerformanceReport } from "../../features/reports/reportsSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./styles.css";
import { ReportsComponentProps } from "./types";

const BidsReports: React.FC<ReportsComponentProps> = ({ timePeriod }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { bidsPerformance, loading, error } = useSelector(
    (state: RootState) => state.reports
  );

  useEffect(() => {
    dispatch(fetchBidsPerformanceReport(timePeriod));
    console.log(bidsPerformance);
  }, [dispatch, timePeriod]);

  const getBidsLabels = () =>
    bidsPerformance?.bids_count.map((data) => data.label) || [];
  const getBidsCounts = () =>
    bidsPerformance?.bids_count.map((data) => data.count) || [];

  const bidsData = {
    labels: getBidsLabels(),
    datasets: [
      {
        label: "",
        data: getBidsCounts(),
        backgroundColor: "#00008B",
        fill: false,
      },
    ],
  };

  const bidsBarData = {
    labels: ["Published", "Accepted"],
    datasets: [
      {
        label: "Bids",
        data: [
          bidsPerformance?.published_bids || 0,
          bidsPerformance?.accepted_bids || 0,
        ],
        backgroundColor: ["#FF8C00", "#00BFFF"],
      },
    ],
  };

  const allBidsBarData = {
    labels: ["Published Bids", "Accepted Bids"],
    datasets: [
      {
        label: "All Bids",
        data: [
          bidsPerformance?.all_published_bids,
          bidsPerformance?.all_accepted_bids,
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
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="dashboard-page-title">Bids Performance</h2>
      <div className="performance-container">
        <div className="performance-left-section">
          <span className="performance-left-section-title">
            {timePeriod == "lastMonth" ? "Last Month" : "Last Year"} Bids Count
          </span>
          <Bar data={bidsData} options={chartLabelHideOption} />
        </div>
        <div className="performance-right-section">
          <div className="performance-right-section-top">
            <span>
              Bids Of {timePeriod == "lastMonth" ? "Last Month" : "Last Year"}
            </span>
            <Doughnut data={bidsBarData} />
          </div>
          <div className="performance-right-section-bottom">
            <span>Bids Of All Times</span>
            <Bar data={allBidsBarData} options={chartLabelHideOption} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsReports;
