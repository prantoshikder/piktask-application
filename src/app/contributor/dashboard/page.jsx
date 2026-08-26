import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import AdminDashboard from "@/views/Dashboard/Contributor/AdminDashboard";

export const metadata = {
  title: "dashboard",
};

export default function Page() {
  return (
    <PrivateRoute>
      <AdminDashboard />
    </PrivateRoute>
  );
}
