import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ activities, categories }) => {
  const totalTime = activities.reduce((sum, a) => sum + a.timeSpent, 0);

  const labels = activities.map((activity) => activity.name);
  const dataPoints = activities.map((activity) => activity.timeSpent);
  const backgroundColors = activities.map(
    (activity) => categories[activity.category] || "#ccc"
  );

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      {activities.length === 0 ? (
        <p>No activity data to display.</p>
      ) : (
        <>
          <h3>Total Time: {totalTime} mins</h3>
          <Pie data={data} />
        </>
      )}
    </div>
  );
};

export default PieChartComponent;
