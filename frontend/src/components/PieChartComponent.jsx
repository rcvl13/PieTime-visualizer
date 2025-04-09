import { useState } from "react";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    name: "",
    category: "",
    timeSpent: "",
  });

  const handleChange = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://pietime-visualizer.onrender.com/add-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity),
      });

      if (response.ok) {
        alert("Activity added successfully!");
        setActivity({ name: "", category: "", timeSpent: "" });
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
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={activity.category}
          onChange={handleChange}
          required
        />
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
