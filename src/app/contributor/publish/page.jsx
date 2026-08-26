import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import Publish from "@/views/Dashboard/Contributor/Publish";

export const metadata = {
  title: "Publish",
};

export default function Page() {
  return (
    <PrivateRoute>
      <Publish />
    </PrivateRoute>
  );
}
