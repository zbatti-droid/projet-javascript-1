import { redirect, type ActionFunctionArgs } from "react-router-dom";

export const searchAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const searchInput = formData.get("searchInput")?.toString() || "";
  return redirect(`/search?query=${encodeURIComponent(searchInput)}`);
};
