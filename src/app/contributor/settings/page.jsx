import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import AccountSettings from "@/views/Dashboard/Contributor/AccountSettings";

export const metadata = {
  title: "Profile",
};

export default function Page() {
  return (
    <PrivateRoute>
      <AccountSettings />
    </PrivateRoute>
  );
}
