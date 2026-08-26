import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import DownloadItems from "@/views/Dashboard/User/DownloadItems";

export const metadata = {
  title: "Downloads",
};

export default function Page() {
  return (
    <PrivateRoute>
      <DownloadItems />
    </PrivateRoute>
  );
}
