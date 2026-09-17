import { LoaderFunctionArgs, redirect } from "react-router-dom";
import customFetch from "../axios/custom";


export const loader = async ({
  params,
}: LoaderFunctionArgs) => {

  try {
    const response = await customFetch.get(`/orders/${params.id}`);
    return response.data;
  } catch {
    return redirect("/login");
  }

};
