import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const register = async () => {
    await axios.post("http://localhost:5000/auth/register", form);
    alert("Registered successfully");
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form,name:e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form,email:e.target.value})} />
      <input type="password" placeholder="Password"
        onChange={e => setForm({...form,password:e.target.value})} />
      <select onChange={e => setForm({...form,role:e.target.value})}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
