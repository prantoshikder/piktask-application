import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import GuidLine from "@/views/Dashboard/Contributor/GuidLine";

export const metadata = {
  title: "Guidline",
};

export default function Page() {
  return (
    <PrivateRoute>
      <GuidLine />
    </PrivateRoute>
  );
}
