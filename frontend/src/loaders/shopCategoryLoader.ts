import type { LoaderFunctionArgs } from "react-router-dom";

export const shopCategoryLoader = ({ params }: LoaderFunctionArgs) =>
  params.category || "";
