import "./App.css";
import { DashboardSettings } from "./components/DashboardSettings";
import { useDashboardConfig } from "./hooks/useDashboardConfig";
import { useConversions } from "./hooks/useConversions";
import { ConversionChart } from "./components/ConversionChart";
import { ConversionTable } from "./components/ConversionTable";
import { ViewToggle } from "./components/ViewToggle";
import "./chart";

import { Box, Typography, CircularProgress, Alert } from "@mui/material";

function App() {
  const { dashboardConfig } = useDashboardConfig();
  const { data, isLoading, error } = useConversions();

  return (
    <Box px={3} py={4}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Currency Exchange Dashboard
      </Typography>

      <Box mb={4} mt={6}>
        <DashboardSettings />
      </Box>

      <Box display="flex" justifyContent="center" mb={4}>
        <ViewToggle />
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box display="flex" justifyContent="center">
          <Alert severity="error">Error: {error.message}</Alert>
        </Box>
      )}

      {data && (
        <Box
          sx={{
            width: "85vw",
            maxWidth: "1200px",
            height: "60vh",
            mx: "auto",
          }}
        >
          <Typography variant="h6" align="center" fontWeight="bold" mb={1}>
            {dashboardConfig.view === "chart"
              ? "Conversion Chart"
              : "Conversion Table"}
          </Typography>

          {dashboardConfig.view === "chart" ? (
            <ConversionChart conversions={data} />
          ) : (
            <ConversionTable conversions={data} />
          )}
        </Box>
      )}
    </Box>
  );
}

export default App;
