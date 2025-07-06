import { useContext } from "react";
import { DashboardContext } from "../contexts/DashboardContext";

export const useDashboardConfig = () => {
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error("This context must have a parent DashboardProvider.");
  }
  return dashboardContext;
};
