import { useState, useEffect } from "react";
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
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Productivity");
  const [timeSpent, setTimeSpent] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newActivity = {
      name,
      category,
      timeSpent: Number(timeSpent),
    };

    try {
      const response = await fetch("http://localhost:5000/add-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newActivity),
      });

      const data = await response.json();
      setActivities((prev) => [...prev, data.activity]);

      setName("");
      setTimeSpent("");
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  // ✅ Reset Handler
  const handleReset = async () => {
    try {
      await fetch("http://localhost:5000/reset-activities", {
        method: "DELETE",
      });
      setActivities([]); // clear UI chart
    } catch (error) {
      console.error("Error resetting activities:", error);
    }
  };

  return (
    <div>
      <h1>Pietime Visualizer</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Time Spent (minutes)"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
          required
        />

        <button type="submit">Add Activity</button>
      </form>

      {/* ✅ Reset Button */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button className="reset-button"
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
  