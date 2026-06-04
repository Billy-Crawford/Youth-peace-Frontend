export interface AlertReport {
  id: string;
  reporter: string;
  reporter_name: string;

  title: string;
  description: string;

  report_type:
    | "TENSION"
    | "VBG"
    | "INITIATIVE";

  location_name: string;

  latitude: string;
  longitude: string;

  photo: string | null;

  status:
    | "PENDING"
    | "IN_REVIEW"
    | "RESOLVED";

  created_at: string;
  updated_at: string;
}

export interface AlertStatistics {
  total_reports: number;
  total_tensions: number;
  total_vbg: number;
  total_initiatives: number;
  pending_reports: number;
  resolved_reports: number;
}