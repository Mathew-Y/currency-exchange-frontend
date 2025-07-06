import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://currency-exchange-backend-ca5e5fc63235.herokuapp.com";

export const useSupportedCurrencies = () => {
  return useQuery<string[], Error>({
    queryKey: ["supported-currencies"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/supported-currencies/`);
      return response.data;
    },
  });
};
