import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import UserSubscription from "@/views/Dashboard/User/UserSubscription";

export const metadata = {
  title: "Subscription",
};

export default function Page() {
  return (
    <PrivateRoute>
      <UserSubscription />
    </PrivateRoute>
  );
}
