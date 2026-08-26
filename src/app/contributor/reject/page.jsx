import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import RejectFiles from "@/views/Dashboard/Contributor/RejectFiles";

export const metadata = {
  title: "RejectFiles",
};

export default function Page() {
  return (
    <PrivateRoute>
      <RejectFiles />
    </PrivateRoute>
  );
}
