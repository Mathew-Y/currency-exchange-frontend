import {
  Chart,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LineController,
  CategoryScale,
} from "chart.js";
import "chartjs-adapter-date-fns"; // for date parsing

Chart.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LineController,
  CategoryScale
);
