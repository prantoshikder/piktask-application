import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import UserProfile from "@/views/Dashboard/User/UserProfile";

export const metadata = {
  title: "UserProfile",
};

export default function Page() {
  return (
    <PrivateRoute>
      <UserProfile />
    </PrivateRoute>
  );
}
