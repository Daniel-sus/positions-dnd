import { data } from "@/data";

export const getPositionsFromLS = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("positions")) || data;
  }
};
