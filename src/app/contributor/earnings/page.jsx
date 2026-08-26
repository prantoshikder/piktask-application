import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import EarningManagement from "@/views/Dashboard/Contributor/EarningManagement";

export const metadata = {
  title: "Earning Management",
};

export default function Page() {
  return (
    <PrivateRoute>
      <EarningManagement />
    </PrivateRoute>
  );
}
