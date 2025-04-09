import { useState, useEffect } from "react";
import ActivityForm from "./components/ActivityForm";
import PieChartComponent from "./components/PieChartComponent";
import "./App.css";

const categories = {
  Productivity: "#FF6384",
  Exercise: "#36A2EB",
  Freetime: "#FFCE56",
  Study: "#4BC0C0",
  Sleep: "#9966FF",
};

const App = () => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const res = await fetch("http://localhost:5000/activities");
      const data = await res.json();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleReset = async () => {
    try {
      await fetch("http://localhost:5000/reset-activities", {
        method: "DELETE",
      });
      setActivities([]);
    } catch (error) {
      console.error("Error resetting activities:", error);
    }
  };

  return (
    <div>
      <h1>Pietime Visualizer</h1>

      <ActivityForm onActivityAdded={fetchActivities} />

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          className="reset-button"
          onClick={handleReset}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Reset Activities
        </button>
      </div>

      <PieChartComponent activities={activities} categories={categories} />
    </div>
  );
};

export default App;
