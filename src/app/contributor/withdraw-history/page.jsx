import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import WithdrawHistory from "@/views/Dashboard/Contributor/WithdrawHistory";

export const metadata = {
  title: "Withdraw History",
};

export default function Page() {
  return (
    <PrivateRoute>
      <WithdrawHistory />
    </PrivateRoute>
  );
}
