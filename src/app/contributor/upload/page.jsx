import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import UploadFiles from "@/views/Dashboard/Contributor/UploadFiles";

export const metadata = {
  title: "Upload",
};

export default function Page() {
  return (
    <PrivateRoute>
      <UploadFiles />
    </PrivateRoute>
  );
}
