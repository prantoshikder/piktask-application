import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import PendingFiles from "@/views/Dashboard/Contributor/PendingFiles";

export const metadata = {
  title: "Pending",
};

export default function Page() {
  return (
    <PrivateRoute>
      <PendingFiles />
    </PrivateRoute>
  );
}
