import { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTasks = async () => {
    const res = await axios.get(`http://localhost:5000/tasks/${user.id}`);
    setTasks(res.data);
  };

  useEffect(() => { loadTasks(); }, []);

  const submitForm = async () => {
    await axios.post("http://localhost:5000/tasks/submit", {
      title, description, user_id: user.id
    });
    loadTasks();
  };

  const completeTask = async (id) => {
    await axios.put(`http://localhost:5000/tasks/complete/${id}`);
    loadTasks();
  };

  const downloadCertificate = (id) => {
    window.open(`http://localhost:5000/certificate/generate/${user.id}/${id}`);
  };

  return (
    <div>
      <h2>Welcome {user.name}</h2>

      <h3>Form</h3>
      <input placeholder="Title" onChange={e=>setTitle(e.target.value)} />
      <input placeholder="Description" onChange={e=>setDescription(e.target.value)} />
      <button onClick={submitForm}>Submit</button>

      <h3>Your Tasks</h3>
      {tasks.map(t => (
        <div key={t.id}>
          <p>{t.title} - {t.status}</p>
          {t.status === "assigned" &&
            <button onClick={()=>completeTask(t.id)}>Complete</button>}
          {t.status === "completed" &&
            <button onClick={()=>downloadCertificate(t.id)}>Certificate</button>}
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
