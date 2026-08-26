import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import Revision from "@/views/Dashboard/Contributor/Revision";

export const metadata = {
  title: "Under Revision",
};

export default function Page() {
  return (
    <PrivateRoute>
      <Revision />
    </PrivateRoute>
  );
}
