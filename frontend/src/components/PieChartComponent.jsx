import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ activities, categories }) => {
  const chartData = {
    labels: activities.map((a) => a.name),
    datasets: [
      {
        data: activities.map((a) => a.timeSpent),
        backgroundColor: activities.map(
          (a) => categories[a.category] || "#999999"
        ),
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };

  return (
    <div className="chart-wrapper">
      <h2 className="chart-title">Activity Pie Chart</h2>
      <div className="responsive-chart">
        {activities.length > 0 ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <p style={{ textAlign: "center" }}>No activities yet.</p>
        )}
      </div>
    </div>
  );
};

export default PieChartComponent;
