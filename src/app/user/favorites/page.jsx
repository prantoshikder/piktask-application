import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import FavoriteItems from "@/views/Dashboard/User/FavoriteItems";

export const metadata = {
  title: "Favorite Items",
};

export default function Page() {
  return (
    <PrivateRoute>
      <FavoriteItems />
    </PrivateRoute>
  );
}
