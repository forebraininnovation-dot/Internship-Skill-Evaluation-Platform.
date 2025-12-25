import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

function Dashboard({ user }) {
  return user.role === "admin"
    ? <AdminDashboard user={user} />
    : <UserDashboard user={user} />;
}

export default Dashboard;
