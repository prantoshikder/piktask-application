import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import DeviceActivity from "@/views/Dashboard/User/DeviceActivity";

export const metadata = {
  title: "Device Activity",
};

export default function Page() {
  return (
    <PrivateRoute>
      <DeviceActivity />
    </PrivateRoute>
  );
}
