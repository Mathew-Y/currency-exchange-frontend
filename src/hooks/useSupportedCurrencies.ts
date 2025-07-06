import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:8000";

export const useSupportedCurrencies = () => {
  return useQuery<string[], Error>({
    queryKey: ["supported-currencies"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/supported-currencies/`);
      return response.data;
    },
  });
};
