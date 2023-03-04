export type DashboardData = {
  total_sales: number | null;
  total_purchases: number | null;
  today_sales: number | null;
  today_purchases: number | null;
  grouped_sales_month: { total_sales: number | null; month: number }[];
};
