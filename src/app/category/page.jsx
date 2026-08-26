import NotFoundPage from "@/views/NotFoundPage";

export const metadata = {
  title: "Page not found",
};

// /category with no category name was a 404 in the CRA router too.
export default function Page() {
  return <NotFoundPage />;
}
