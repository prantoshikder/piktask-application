import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import ContributorPricePlan from "@/views/Dashboard/Contributor/ContributorPricePlan";

export const metadata = {
  title: "Contributor Price Plan",
};

export default function Page() {
  return (
    <PrivateRoute>
      <ContributorPricePlan />
    </PrivateRoute>
  );
}
