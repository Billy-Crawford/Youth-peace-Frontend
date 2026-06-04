// src/lib/alerts.ts

import api from "./api";


export const getAlerts = async () => {
  const res = await api.get("/api/alerts/reports/");
  return res.data;
};

export const createAlert = async (data: any) => {
  const res = await api.post("/api/alerts/reports/", data);
  return res.data;
};

export const getReports = async (
  reportType?: string
) => {
  const url = reportType
    ? `/api/alerts/reports/?report_type=${reportType}`
    : "/api/alerts/reports/";

  const res = await api.get(url);

  return res.data;
};

export const getStatistics =
  async () => {
    const res = await api.get(
      "/api/alerts/statistics/"
    );

    return res.data;
  };


  
