import { useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const assignTask = async () => {
    await axios.post("http://localhost:5000/tasks/assign", {
      title,
      description,
      user_id: userId
    });
    alert("Task Assigned");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <input placeholder="Task Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />

      <button onClick={assignTask}>Assign Task</button>
    </div>
  );
}

export default AdminDashboard;
