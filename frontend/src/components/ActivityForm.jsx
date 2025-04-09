import { useState } from "react";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    name: "",
    category: "Productivity", // default category
    timeSpent: "",
  });

  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/add-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...activity,
          timeSpent: Number(activity.timeSpent),
        }),
      });

      if (response.ok) {
        alert("Activity added successfully!");
        setActivity({ name: "", category: "Productivity", timeSpent: "" });
        onActivityAdded(); // Refresh the chart
      } else {
        alert("Failed to add activity.");
      }
    } catch (error) {
      console.error("Error adding activity:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Add Activity</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Activity Name"
          value={activity.name}
          onChange={handleChange}
          required
        />

        <select name="category" value={activity.category} onChange={handleChange} required>
          <option value="Productivity">Productivity</option>
          <option value="Exercise">Exercise</option>
          <option value="Freetime">Freetime</option>
          <option value="Study">Study</option>
          <option value="Sleep">Sleep</option>
        </select>

        <input
          type="number"
          name="timeSpent"
          placeholder="Time Spent (minutes)"
          value={activity.timeSpent}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ActivityForm;
