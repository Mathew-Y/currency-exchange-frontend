import axios from "axios";
import { Conversion } from "../models/conversion";

const API_URL = "https://currency-exchange-backend-ca5e5fc63235.herokuapp.com";

export interface GetConversionsParams {
  start_date: string;
  end_date: string;
  base: string;
  symbols: string[];
}

export const getConversions = async (
  params: GetConversionsParams
): Promise<Conversion[]> => {
  const response = await axios.get(`${API_URL}/api/conversions/`, {
    params: {
      start_date: params.start_date,
      end_date: params.end_date,
      base: params.base,
      target: params.symbols.join(","),
    },
  });
  return response.data;
};
