import { useQueries } from "@tanstack/react-query";
import { getConversions } from "../api/conversions";
import { useDashboardConfig } from "./useDashboardConfig";

export const useConversions = () => {
  const { dashboardConfig } = useDashboardConfig();
  const { startDate, endDate, selectedPairs } = dashboardConfig;

  const groupByUniqueBases = (selectedPairs || []).reduce(
    (acc, { base, target }) => {
      if (!acc[base]) acc[base] = [];
      acc[base].push(target);
      return acc;
    },
    {} as Record<string, string[]>
  );

  const queries = Object.entries(groupByUniqueBases).map(([base, targets]) => ({
    queryKey: ["conversions", base, startDate, endDate, ...targets],
    queryFn: () =>
      getConversions({
        start_date: startDate,
        end_date: endDate,
        base,
        symbols: targets,
      }),
    enabled:
      !!startDate &&
      !!endDate &&
      selectedPairs &&
      selectedPairs.length > 0 &&
      targets.length > 0,
  }));

  const queryResults = useQueries({ queries });

  const isLoading = queryResults.some((result) => result.isLoading);
  const error = queryResults.find((result) => result.error)?.error;
  const data = queryResults.flatMap((result) => result.data ?? []);

  return { data, isLoading, error };
};
