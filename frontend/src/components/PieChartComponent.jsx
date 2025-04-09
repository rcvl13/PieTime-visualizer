import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ activities, categories }) => {
  const totalTime = activities.reduce((sum, activity) => sum + activity.timeSpent, 0);

  // Each activity name becomes a label
  const labels = activities.map((activity, index) => `${activity.name} (${activity.timeSpent} mins)`);

  // Pie data points
  const dataPoints = activities.map((activity) => activity.timeSpent);

  // Match background color with its category
  const backgroundColors = activities.map(
    (activity) => categories[activity.category] || "#cccccc"
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Time Spent (mins)",
        data: dataPoints,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.formattedValue || "";
            return `${label}: ${value} mins`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      {activities.length === 0 ? (
        <p>No activity data to display.</p>
      ) : (
        <>
          <h3><strong>Total Time:</strong> {totalTime} mins</h3>
          <Pie data={data} options={options} />
        </>
      )}
    </div>
  );
};

export default PieChartComponent;
