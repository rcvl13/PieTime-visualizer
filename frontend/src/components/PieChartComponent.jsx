import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ activities, categories }) => {
  const totalTime = activities.reduce((sum, a) => sum + a.timeSpent, 0);

  const dataByCategory = activities.reduce((acc, activity) => {
    acc[activity.category] = (acc[activity.category] || 0) + activity.timeSpent;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(dataByCategory),
    datasets: [
      {
        data: Object.values(dataByCategory),
        backgroundColor: Object.keys(dataByCategory).map((cat) => categories[cat] || "#ccc"),
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
