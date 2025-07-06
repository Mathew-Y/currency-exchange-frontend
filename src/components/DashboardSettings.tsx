import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { useDashboardConfig } from "../hooks/useDashboardConfig";
import { useSupportedCurrencies } from "../hooks/useSupportedCurrencies";
import { useMemo } from "react";

export const DashboardSettings = () => {
  const { dashboardConfig, updateSetting } = useDashboardConfig();
  const { data: currencies, isLoading } = useSupportedCurrencies();

  const allPairs = useMemo(() => {
    if (!currencies) return [];
    const pairs: { base: string; target: string }[] = [];
    for (const base of currencies) {
      for (const target of currencies) {
        if (base !== target) {
          pairs.push({ base, target });
        }
      }
    }
    return pairs;
  }, [currencies]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];
    const newPairs = selected.map((pair) => {
      const [base, target] = pair.split("→").map((s) => s.trim());
      return { base, target };
    });
    updateSetting("selectedPairs", newPairs);
  };

  const selectedPairLabels =
    dashboardConfig.selectedPairs?.map((p) => `${p.base} → ${p.target}`) ?? [];

  if (isLoading) return <p>Loading currencies...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        padding: "0 1rem",
        marginBottom: "2rem",
        maxWidth: "1100px",
        marginInline: "auto",
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Select Pairs</InputLabel>
        <Select
          multiple
          value={selectedPairLabels}
          onChange={handleSelectChange}
          input={<OutlinedInput label="Select Pairs" />}
          renderValue={(selected) =>
            selected.length === 1 ? selected[0] : `${selected.length} selected`
          }
        >
          {allPairs.map(({ base, target }) => {
            const label = `${base} → ${target}`;
            return (
              <MenuItem key={label} value={label}>
                <Checkbox checked={selectedPairLabels.includes(label)} />
                <ListItemText primary={label} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <div
        style={{
          minWidth: 200,
          maxWidth: 250,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>Start Date:</label>
        <input
          type="date"
          value={dashboardConfig.startDate}
          onChange={(e) => updateSetting("startDate", e.target.value)}
          max={dashboardConfig.endDate}
        />
      </div>

      <div
        style={{
          minWidth: 200,
          maxWidth: 250,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label>End Date:</label>
        <input
          type="date"
          value={dashboardConfig.endDate}
          onChange={(e) => updateSetting("endDate", e.target.value)}
          min={dashboardConfig.startDate}
        />
      </div>
    </div>
  );
};
