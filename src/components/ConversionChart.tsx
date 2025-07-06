import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Conversion } from "../models/conversion";

interface ConversionChartProps {
  conversions: Conversion[];
}

const COLORS = [
  "#3366CC",
  "#DC3912",
  "#109618",
  "#990099",
  "#0099C6",
  "#DD4477",
  "#66AA00",
  "#FF9900",
  "#3B3EAC",
  "#B82E2E",
];

export const ConversionChart = ({ conversions }: ConversionChartProps) => {
  const grouped = useMemo(() => {
    return conversions.reduce((acc, curr) => {
      const label = `${curr.base}→${curr.target}`;
      acc[label] = acc[label] || [];
      acc[label].push({ date: curr.date, rate: curr.rate });
      return acc;
    }, {} as Record<string, { date: string; rate: number }[]>);
  }, [conversions]);

  const datasets = useMemo(() => {
    return Object.entries(grouped).map(([label, values], index) => {
      const color = COLORS[index % COLORS.length];
      return {
        label,
        data: values.map((v) => ({ x: v.date, y: v.rate })),
        fill: false,
        borderColor: color,
        backgroundColor: color,
      };
    });
  }, [grouped]);

  return (
    <Line
      data={{
        datasets,
      }}
      options={{
        maintainAspectRatio: false,
        scales: {
          x: { type: "time", time: { unit: "day" } },
          y: { beginAtZero: false },
        },
      }}
    />
  );
};
