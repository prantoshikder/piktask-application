import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import UserFollowing from "@/views/Dashboard/User/UserFollowing";

export const metadata = {
  title: "Followings",
};

export default function Page() {
  return (
    <PrivateRoute>
      <UserFollowing />
    </PrivateRoute>
  );
}
