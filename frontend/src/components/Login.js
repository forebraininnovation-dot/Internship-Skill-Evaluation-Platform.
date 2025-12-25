import { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const login = async () => {
    const res = await axios.post("http://localhost:5000/auth/login", {
      email, password
    });
    setUser(res.data);
  };

  if (user) return <Dashboard user={user} />;

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        onChange={e=>setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
