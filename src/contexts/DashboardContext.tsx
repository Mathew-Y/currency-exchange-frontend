import React, { createContext, useState, useEffect } from "react";

export interface ConversionPair {
  base: string;
  target: string;
}

export interface DashboardConfig {
  startDate: string;
  endDate: string;
  selectedPairs: ConversionPair[];
  view: "chart" | "table";
}

const defaultConfig: DashboardConfig = {
  startDate: "",
  endDate: "",
  selectedPairs: [],
  view: "chart",
};

type DashboardContextType = {
  dashboardConfig: DashboardConfig;
  updateSetting: <K extends keyof DashboardConfig>(
    key: K,
    value: DashboardConfig[K]
  ) => void;
};

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig>(
    () => {
      const stored = localStorage.getItem("dashboardConfig");
      return stored ? JSON.parse(stored) : defaultConfig;
    }
  );

  useEffect(() => {
    localStorage.setItem("dashboardConfig", JSON.stringify(dashboardConfig));
  }, [dashboardConfig]);

  const updateSetting = <K extends keyof DashboardConfig>(
    key: K,
    value: DashboardConfig[K]
  ) => {
    setDashboardConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DashboardContext.Provider value={{ dashboardConfig, updateSetting }}>
      {children}
    </DashboardContext.Provider>
  );
};
