import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { useDashboardConfig } from "../hooks/useDashboardConfig";

export const ViewToggle = () => {
  const { dashboardConfig, updateSetting } = useDashboardConfig();
  const isChartView = dashboardConfig.view === "chart";

  const handleToggle = () => {
    updateSetting("view", isChartView ? "table" : "chart");
  };

  return (
    <FormControlLabel
      control={
        <Switch checked={isChartView} onChange={handleToggle} color="primary" />
      }
      label={isChartView ? "Chart View" : "Table View"}
      labelPlacement="start"
      sx={{ marginLeft: 2 }}
    />
  );
};
