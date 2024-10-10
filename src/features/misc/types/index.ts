export type Report = {
  availableParkingSlots: number;
  occupiedSlots: number;
  averageRotation: number;
};

export type Status = {
  occupied: number;
  vacant: number;
};

export type Revenue = {
  todayRevenue: number;
  todayRevenuePercentage: number;
  yesterdayRevenue: number;
  lastMonthRevenue: number;
  currentMonthRevenue: number;
  currentMonthPercentage: number;
};

export type LineChartPlacesOccupied = {
  time: number[];
  values: number[];
};

export type BarChartPlacesOccupied = {
  subscribers: number[];
  nonSubscribers: number[];
  shortTermParking: number[];
};

export type ReportDTO = {
  available_parking_slots: number;
  occupied_slots: number;
  average_rotation: number;
};

export type StatusDTO = {
  occupied: number;
  vacant: number;
};

export type RevenueDTO = {
  today_revenue: number;
  today_revenue_percentage: number;
  yesterday_revenue: number;
  last_month_revenue: number;
  current_month_revenue: number;
  current_month_percentage: number;
};

export type LineChartPlacesOccupiedDTO = {
  time: number[];
  values: number[];
};

export type BarChartPlacesOccupiedDTO = {
  subscribers: number[];
  non_subscribers: number[];
  short_term_parking: number[];
};

export type ParkingReportItemProps = {
  icon: any;
  label: string;
  value: number | string | undefined;
  color: string;
};

export type RevenueItemProps = {
  icon: any;
  title: string;
  revenuePercentage: number;
  currentSubtitle: string;
  currentValue: number;
  pastSubtitle: string;
  pastValue: number;
};
