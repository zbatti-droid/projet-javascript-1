import { redirect } from "react-router-dom";
import customFetch from "../axios/custom";

export const orderHistoryLoader = async () => {
  try {
    const response = await customFetch.get<Order[]>("/orders/my");
    return response.data;
  } catch {
    return redirect("/login");
  }
};
